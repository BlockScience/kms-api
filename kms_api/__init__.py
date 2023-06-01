from fastapi import FastAPI, Response, status
from pydantic import BaseModel
from firebase_admin import firestore, initialize_app
from kms_api import config
from url_normalize import url_normalize
from base64 import b64encode

app = FastAPI()
firestore_db = firestore.client(initialize_app(options=config.FIREBASE_OPTIONS))

class KnowledgeObject(BaseModel):
    url: str
    title: str | None = None
    text: str | None = None
    platform: str | None = None

def encode_url(string):
    return b64encode(string.encode('ascii')).decode('ascii')

@app.get("/")
def root():
    return {"message": "Hello World!"}

@app.post("/knowledge")
def create_knowledge(kobj: KnowledgeObject, resp: Response):
    url_normalized = url_normalize(kobj.url)
    url_encoded = encode_url(url_normalized)

    blacklist = firestore_db.collection('meta').document('blacklist').get().to_dict().get('urls', [])

    print(kobj.url, url_normalized, url_encoded)

    if url_normalized in blacklist:
        resp.status_code = status.HTTP_202_ACCEPTED
        return {
            'status': 'failure',
            'error': 'URL is blacklisted'
        }
        
    firestore_db.collection('knowledge').document(url_encoded).set(kobj.dict(), merge=True)

    return {'status': 'success', 'id': url_encoded}

@app.get("/knowledge/{object_id}")
def get_knowledge(object_id: str):
    kobj = firestore_db.collection('knowledge').document(object_id).get()
    return kobj.to_dict()

@app.get("/knowledge")
def query_knowledge():
    return

@app.put("/knowledge")
def update_knowledge():
    return

@app.delete("/knowledge")
def delete_knowledge():
    return