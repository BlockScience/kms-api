import json

# firebase
FIREBASE_SERVICE_ACCOUNT_ID = 'firebase-adminsdk-mzr6v@knowledge-management-333914.iam.gserviceaccount.com'
FIREBASE_OPTIONS = {'serviceAccountId': FIREBASE_SERVICE_ACCOUNT_ID}

# typesense
TYPESENSE_NODES = [{
    'host': 'h5gtrz8d0yqa2i1bp-1.a1.typesense.net',
    'port': '443',
    'protocol': 'https'
}]
HIGHLIGHT_AFFIX_NUM_TOKENS = 30
PER_PAGE = 2

# API auth
API_KEY_HEADER_NAME = "access_token"
API_KEYS_FILENAME = "api_keys.json"
API_KEY_LENGTH = 20