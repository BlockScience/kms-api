from fastapi import FastAPI
from kms_api.routers import knowledge, proposals, users

app = FastAPI()
app.include_router(knowledge.router)
app.include_router(proposals.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Hello World!"}