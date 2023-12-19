import typesense
from firebase_admin import firestore, initialize_app, credentials
from os import environ as env
from config import TYPESENSE_NODES, FIREBASE_OPTIONS
from api.VerifyToken import JWToken


TYPESENSE_API_KEY = env.get("TYPESENSE_ADMIN_API_KEY")
TYPESENSE_OPTIONS = {
    "nodes": TYPESENSE_NODES,
    "api_key": TYPESENSE_API_KEY,
    "connection_timeout_seconds": 4,
}

cert = {
    "type": "service_account",
    "project_id": env.get("firestore_project_id"),
    "private_key_id": env.get("firestore_private_key_id"),
    "private_key": (env.get("firestore_private_key") or "").replace("\\n", "\n"),
    "client_email": env.get("firestore_client_email"),
    "client_id": env.get("firestore_client_id"),
    "auth_uri": env.get("firestore_auth_uri"),
    "token_uri": env.get("firestore_token_uri"),
    "auth_provider_x509_cert_url": env.get("firestore_auth_provider_x509_cert_url"),
    "client_x509_cert_url": env.get("firestore_client_x509_cert_url"),
}

firestore_db = firestore.client(
    initialize_app(credential=credentials.Certificate(cert), options=FIREBASE_OPTIONS)
)
typesense_db = typesense.Client(TYPESENSE_OPTIONS)
jwtAuth: JWToken = JWToken()
