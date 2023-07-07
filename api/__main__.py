import uvicorn
from config import BACKEND_NAME

uvicorn.run(f"{BACKEND_NAME}:app", log_level="debug")
