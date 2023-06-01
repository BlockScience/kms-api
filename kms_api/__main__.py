import uvicorn
from kms_api import app

uvicorn.run("kms_api:app", reload=True)