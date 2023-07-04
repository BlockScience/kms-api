# local paths
PROJECT_PATH = '/home/admin/kms-api'
SSL_CERT_PATH = '/etc/letsencrypt/live/kms-beta.block.science/fullchain.pem'
SSL_CERT_KEY_PATH = '/etc/letsencrypt/live/kms-beta.block.science/privkey.pem'

DOMAIN = 'kms-beta.block.science'
FASTAPI_LOCAL_URI = 'http://localhost:8000'
VITE_DEV_LOCAL_URI = 'https://localhost:3000'

# setup
CONF_PATH = 'conf/'
SYSTEMD_SETUP_FILE = CONF_PATH + 'setup-kms-api.service'
SYSTEMD_LIVE_FILE = CONF_PATH + 'kms-api.service'
NGINX_SETUP_FILE = CONF_PATH + 'setup-nginx.conf'
NGINX_LIVE_FILE = CONF_PATH + 'nginx.conf'

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
API_KEY_HEADER_NAME = "token"
API_KEYS_FILENAME = "api_keys.json"
API_KEY_LENGTH = 20

AUTH0_DOMAIN = 'auth.kms-beta.block.science'
AUTH0_AUDIENCE = 'https://127.0.0.1:8000'
AUTH0_ISSUER = 'https://auth.kms-beta.block.science/'
AUTH0_CLIENT = 'dev-67fgpygy2qoenl7r'
AUTH0_ALGORITHMS = 'RS256'
