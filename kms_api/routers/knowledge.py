from fastapi import APIRouter, Response, status, Depends, Body
from kms_api.core import firestore_db
from kms_api.utils import url_normalize, encode_url, search_typesense, query
from kms_api.auth import validate_auth
from kms_api.schema import KNOWLEDGE_SCHEMA, QUERY_SCHEMA
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from typesense.exceptions import RequestMalformed

router = APIRouter(
    prefix="/object",
    dependencies=[Depends(validate_auth)]
)

@router.post("")
def create_knowledge(response: Response, knowledge: dict = Body(...)):
    try:
        validate(knowledge, KNOWLEDGE_SCHEMA)
    except ValidationError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    url_normalized = url_normalize(knowledge["url"])
    url_encoded = encode_url(url_normalized)
    
    firestore_db.collection('knowledge').document(url_encoded).set(knowledge, merge=True)

    return {'status': 'success', 'id': url_encoded}

@router.get("/query")
def typesense_query(response: Response, query: dict = Body(...)):
    try:
        validate(query, QUERY_SCHEMA)
    except ValidationError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}
    
    try:
        return search_typesense(query)
    except RequestMalformed as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": str(e)}

@router.get("/{object_id}")
def get_knowledge(object_id: str):
    kobj = firestore_db.collection('knowledge').document(object_id).get()
    return kobj.to_dict()

@router.get("")
def query_knowledge(q: str, page: int = 1, per_page: int = 15):
    if q == '': return {'status': 'failure', 'error': 'missing query param: q'}
    return search_typesense(query(q, page, per_page))

@router.put("/{object_id}")
def update_knowledge(object_id: str, knowledge: dict = Body(...)):
    # no validation here, may be need in the future
    firestore_db.collection('knowledge').document(object_id).set(knowledge, merge=True)
    return {'status': 'success'}

@router.delete("/{object_id}")
def delete_knowledge(object_id: str):
    firestore_db.collection('knowledge').document(object_id).delete()
    return {'status': 'success'}