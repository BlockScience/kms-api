from firebase_admin import firestore, initialize_app
import typesense
from kms_api import config

firestore_db = firestore.client(initialize_app(options=config.FIREBASE_OPTIONS))
typesense_db = typesense.Client(config.TYPESENSE_OPTIONS)