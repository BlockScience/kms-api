from firebase_admin import firestore, initialize_app
from kms_api import config

firestore_db = firestore.client(initialize_app(options=config.FIREBASE_OPTIONS))