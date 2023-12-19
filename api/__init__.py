from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(verbose=True)

from fastapi import FastAPI

from api.routers import chat, feedback, objects, meta, proposals, rag, test, users

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5420",
    "http://localhost:5173",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(objects.router)
app.include_router(proposals.router)
app.include_router(users.router)
app.include_router(feedback.router)
app.include_router(meta.router)
app.include_router(chat.router)
app.include_router(rag.router)
app.include_router(test.router)


@app.get("/")
def root():
    return {"message": "Hello from the other side!"}
