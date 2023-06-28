import uvicorn
from kms_api import app

uvicorn.run("api:app", reload=True, log_level="debug", ssl_keyfile="./.certs/key.pem", ssl_certfile="./.certs/cert.pem")
