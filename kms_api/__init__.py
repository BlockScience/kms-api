from fastapi import FastAPI
from kms_api import knowledge

app = FastAPI()
app.include_router(knowledge.router)

@app.get("/")
def root():
    return {"message": "Hello World!"}