from fastapi import APIRouter, Depends
from api.core import firestore_db
from api.auth import validate_auth

router = APIRouter(prefix="/meta", dependencies=[Depends(validate_auth)])


@router.get("/schema")
def get_schema():
    return firestore_db.collection("meta").document("schema").get().get("markdown")


@router.get("/tagsets")
def get_tagsets():
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
    scores = (
        firestore_db.collection("meta").document("curation_statistics").get().to_dict()
    )
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)
