from firebase_admin import firestore, initialize_app
import typesense
from kms_api import config
from kms_api.secret_manager import access_secret_version

TYPESENSE_API_KEY = access_secret_version('knowledge-management-333914', 'TYPESENSE_ADMIN_API_KEY', 'latest')
TYPESENSE_OPTIONS = {
    'nodes': config.TYPESENSE_NODES,
    'api_key': TYPESENSE_API_KEY,
    'connection_timeout_seconds': 2
}

firestore_db = firestore.client(initialize_app(options=config.FIREBASE_OPTIONS))
typesense_db = typesense.Client(TYPESENSE_OPTIONS)