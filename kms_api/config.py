from kms_api.secret_manager import access_secret_version

FIREBASE_SERVICE_ACCOUNT_ID = 'firebase-adminsdk-mzr6v@knowledge-management-333914.iam.gserviceaccount.com'
TYPESENSE_API_KEY = access_secret_version('knowledge-management-333914', 'TYPESENSE_ADMIN_API_KEY', 'latest')
TYPESENSE_NODES = [{
    'host': 'h5gtrz8d0yqa2i1bp-1.a1.typesense.net',
    'port': '443',
    'protocol': 'https'
}]
FIREBASE_OPTIONS = {'serviceAccountId': FIREBASE_SERVICE_ACCOUNT_ID}
TYPESENSE_OPTIONS = {
    'nodes': TYPESENSE_NODES,
    'api_key': TYPESENSE_API_KEY,
    'connection_timeout_seconds': 2
}

# typesense
HIGHLIGHT_AFFIX_NUM_TOKENS = 30
PER_PAGE = 2