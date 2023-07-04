from fastapi import APIRouter, Body, Depends, Response, status
from firebase_admin import firestore
from jsonschema import validate
from jsonschema.exceptions import ValidationError

from api.auth import validate_auth
from api.core import firestore_db
from api.schema import PROPOSAL_SCHEMA, RESOLUTION_SCHEMA
from api.utils.query import check_for_missing_ids, md5_dict, simplify_ops

router: APIRouter = APIRouter(prefix="/proposal", dependencies=[Depends(validate_auth)])


@router.post("")
def create_proposal(response: Response, proposal: dict = Body(...)):
    """Takes a proposal JSON and enters in the database. Returns a human readable confirmation"""
    try:
        validate(proposal, PROPOSAL_SCHEMA)
    except ValidationError as e:
        print(e)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    proposal["operations"] = simplify_ops(proposal["operations"])
    missing = check_for_missing_ids(proposal)

    if missing:
        nl = "\n"
        message = f"Error: Proposal contains {len(missing)} operations for non-existent artifacts:\n{nl.join(missing[:10])}{'...' if len(missing) > 10 else ''}"
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": message}

    CID: str = md5_dict(proposal["operations"])
    firestore_db.collection("proposals").document(CID).set(proposal)

    return {
        "message": f"Submitted proposal \033[1m{proposal['name']}\033[0m ({CID}) successfully with {len(proposal['operations'])} operations"
    }


@router.get("")
def get_proposals(status: str | None = None):
    """Returns all proposals or those of a specific status type"""
    if status:
        proposals = (
            firestore_db.collection("proposals").where("status", "==", status).get()
        )
    else:
        proposals = firestore_db.collection("proposals").get()
    return [proposal.to_dict() | {"id": proposal.id} for proposal in proposals]


@router.get("/{proposal_id}")
def get_proposal(proposal_id: str):
    """Takes an ID and returns the corresponding proposal"""
    proposal = firestore_db.collection("proposals").document(proposal_id).get()
    return proposal.to_dict()


@router.post("/{proposal_id}/resolve")
def resolve_proposal(
    response: Response, proposal_id: str, resolution: dict = Body(...)
):
    """Takes a proposal ID and resolution JSON and returns the outcome"""
    try:
        validate(resolution, RESOLUTION_SCHEMA)
    except ValidationError as e:
        print(e)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    new_status = resolution["status"]
    resolved_by = resolution["resolved_by"]

    transaction = firestore_db.transaction()
    proposal_ref = firestore_db.collection("proposals").document(proposal_id)

    proposal: dict = proposal_ref.get().to_dict()
    if proposal is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": "Proposal does not exist"}

    current_status: str = proposal["status"]
    if current_status == "applied":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": "Proposal has already been applied"}
    if current_status == "rejected":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": "Proposal has already been rejected"}
    if current_status == "accepted":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": "Proposal has already been accepted"}

    if new_status == "rejected":
        proposal_ref.set({"status": "rejected"}, merge=True)
        return {"message": "Proposal has been rejected"}

    def bold(text: str):
        return f"\033[1m{text}\033[0m"

    # APPLY PROPOSAL
    curation_ref = firestore_db.collection("curation")
    knowledge_ref = firestore_db.collection("knowledge")

    @firestore.transactional
    def apply_proposal(
        transaction: firestore.Transaction,
        curation_collection,
        knowledge_collection,
        operations: list,
    ) -> dict[str, str] | None:
        tagsets: dict = {}
        refs: dict = {}

        # Do all the reads first
        for proposed_op in operations:
            target = proposed_op["id"]
            action = proposed_op["action"]
            payload = proposed_op["payload"]
            refs[target] = curation_collection.document(target)
            if target not in tagsets:
                # get existing tags if they exist
                if refs[target].get(transaction=transaction).exists:
                    tagsets[target] = set(
                        refs[target].get(transaction=transaction).to_dict()["tags"]
                    )
                # else set tags to empty set
                elif (
                    knowledge_collection.document(target)
                    .get(transaction=transaction)
                    .exists
                ):
                    tagsets[target] = set()
                # raise if id is not in knowledge or curation
                else:
                    print(
                        ValueError(
                            f"Proposal was not applied because ID {bold(target)} does not exist in knowledgebase"
                        )
                    )

                    response.status_code = status.HTTP_400_BAD_REQUEST
                    return {
                        "message": f"Proposal was not applied because ID {bold(target)} does not exist in knowledgebase"
                    }

            if action == "remove_tags":
                tagsets[target] -= set(payload)
            elif action == "add_tags":
                tagsets[target] |= set(payload)
            elif action == "replace_tags":
                tagsets[target] -= set(payload["tags"])
                tagsets[target] |= set(payload["replacement"])

        # Do all the writes
        for target, proposed_op in tagsets.items():
            transaction.set(refs[target], {"tags": list(proposed_op)}, merge=True)
        return None

    try:
        proposal_result = apply_proposal(
            transaction, curation_ref, knowledge_ref, proposal["operations"]
        )
        if proposal_result is not None:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return {"message": proposal_result}
        proposal_ref.set({"status": "applied", "resolved_by": resolved_by}, merge=True)
    except Exception as e:
        proposal_ref.set({"status": "accepted", "resolved_by": resolved_by}, merge=True)
        print(
            Exception(
                f"Proposal {proposal_id} was accepted but not applied. Error: {e}"
            )
        )

        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {
            "message": f"Proposal {proposal_id} was accepted but not applied. Error: {e}"
        }

    return {
        "message": f"Proposal {bold(proposal_id)} was accepted by {bold(resolved_by)} and applied successfully"
    }
