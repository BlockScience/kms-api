from fastapi import APIRouter, Body, Depends, Response, status
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from typesense.exceptions import ObjectNotFound, RequestMalformed

from api.auth import validate_auth
from api.core import firestore_db
from api.schema import KOBJ_SCHEMA, QUERY_SCHEMA
from api.utils.query import encode_url, query, search_typesense
from api.utils.profile import profile
from url_normalize import url_normalize

router: APIRouter = APIRouter(prefix="/objects", dependencies=[Depends(validate_auth)])


@router.post("")
def create_object(response: Response, kobj: dict = Body(...)):
    """Takes a knowledge object and enters it into the database. Returns the new object ID"""
    try:
        validate(kobj, KOBJ_SCHEMA)
    except ValidationError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    url_normalized = url_normalize(kobj["url"])
    url_encoded = encode_url(url_normalized)

    firestore_db.collection("knowledge").document(url_encoded).set(kobj, merge=True)

    return {"status": "success", "id": url_encoded}


@router.post("/query")
@profile
def typesense_query(response: Response, query: dict = Body(...)):
    """Takes a Typesense query JSON and returns the matching objects"""
    try:
        validate(query, QUERY_SCHEMA)
    except ValidationError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    try:
        return search_typesense(query)
    except (RequestMalformed, ObjectNotFound) as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": str(e)}


@router.get("/{object_id}")
def get_object(object_id: str):
    """Takes a knowledge object ID and returns the object"""
    return firestore_db.collection("knowledge").document(object_id).get().to_dict()


@router.get("")
def query_objects(q: str, page: int = 1, per_page: int = 15):
    """Takes a query string and returns the matching objects"""
    if q == "":
        return {"status": "failure", "error": "missing query param: q"}
    return search_typesense(query(q, page, per_page))


@router.put("/{object_id}")
def update_object(object_id: str, knowledge: dict = Body(...)):
    """Takes an object ID and fields to update in the database"""
    # no validation here, may be need in the future
    firestore_db.collection("knowledge").document(object_id).set(knowledge, merge=True)
    return {"status": "success"}


@router.delete("/{object_id}")
def delete_object(object_id: str):
    """Takes an object ID and deletes that object from the database"""
    firestore_db.collection("knowledge").document(object_id).delete()
    return {"status": "success"}
