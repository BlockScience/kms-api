import os.path

DEFAULT_CONFIG = 'conf/default-config.py'
LIVE_CONFIG = 'config.py'

if not os.path.exists(LIVE_CONFIG):
    print("config.py not found, cloning from default")
    with open(DEFAULT_CONFIG, 'r') as f:
        with open(LIVE_CONFIG, 'w') as g:
            g.write(f.read())

from config import *

with open(SYSTEMD_SETUP_FILE, 'r') as f:
    with open(SYSTEMD_LIVE_FILE, 'w') as g:
        setup = f.read()
        live = setup.format(PROJECT_PATH)
        g.write(live)

with open(NGINX_SETUP_FILE, 'r') as f:
    with open(NGINX_LIVE_FILE, 'w') as g:
        setup = f.read()
        live = setup.format(PROJECT_PATH, DOMAIN, SSL_CERT_PATH, SSL_CERT_KEY_PATH, VITE_DEV_LOCAL_URI, FASTAPI_LOCAL_URI)
        g.write(live)