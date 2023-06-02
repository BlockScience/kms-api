from fastapi import APIRouter, Response, status
from kms_api.core import firestore_db
from kms_api.models import KnowledgeObject
from kms_api.utils import url_normalize, encode_url, search_typesense, query

router = APIRouter(
    prefix="/knowledge"
)

@router.post("")
def create_knowledge(kobj: KnowledgeObject, resp: Response):
    url_normalized = url_normalize(kobj.url)
    url_encoded = encode_url(url_normalized)

    blacklist = firestore_db.collection('meta').document('blacklist').get().to_dict().get('urls', [])

    if url_normalized in blacklist:
        resp.status_code = status.HTTP_202_ACCEPTED
        return {
            'status': 'failure',
            'error': 'URL is blacklisted'
        }
        
    firestore_db.collection('knowledge').document(url_encoded).set(kobj.dict(), merge=True)

    return {'status': 'success', 'id': url_encoded}

@router.get("/{object_id}")
def get_knowledge(object_id: str):
    kobj = firestore_db.collection('knowledge').document(object_id).get()
    return kobj.to_dict()

@router.get("")
def query_knowledge(q: str, page: int = 1, per_page: int = 15):
    if q == '':
        return {'status': 'failure', 'error': 'missing query param: q'}

    return search_typesense(query(q, page, per_page))

@router.put("")
def update_knowledge():
    return

@router.delete("/{object_id}")
def delete_knowledge(object_id: str):
    firestore_db.collection('knowledge').document(object_id).delete()
    return {'status': 'success'}