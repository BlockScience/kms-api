import uvicorn
from config import BACKEND_NAME

uvicorn.run(f"{BACKEND_NAME}:app", reload=True, log_level="debug")
