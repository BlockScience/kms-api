from fastapi import APIRouter, Depends

from api.auth import validate_auth
from api.core import firestore_db
from api.utils.profile import profile

router: APIRouter = APIRouter(prefix="/meta", dependencies=[Depends(validate_auth)])


@router.get("/schema")
@profile
def get_schema():
    """Returns the human readable schema stored in the database"""
    schema = firestore_db.collection("meta").document("schema").get().get("markdown")
    return schema


@router.get("/tagsets")
def get_tagsets():
    """Returns a list of tagsets computed from the database"""
    schema = set(
        firestore_db.collection("meta")
        .document("tagsets")
        .get()
        .to_dict()
        .get("schema", [])
    )
    knowledgebase = set(
        firestore_db.collection("meta")
        .document("tagsets")
        .get(["curation"])
        .to_dict()["curation"]
        .keys()
    )
    return {
        "schema": schema.difference(knowledgebase),
        "knowledgebase": knowledgebase.difference(schema),
        "intersection": schema.intersection(knowledgebase),
        "union": schema.union(knowledgebase),
    }


@router.get("/curation_stats")
def get_curation_stats():
    """Returns the curation statistics from the database"""
    scores = (
        firestore_db.collection("meta").document("curation_statistics").get().to_dict()
    )
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)
