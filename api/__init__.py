from dotenv import load_dotenv


load_dotenv(verbose=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import chat, feedback, knowledge, meta, proposals, test, users


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(knowledge.router)
app.include_router(proposals.router)
app.include_router(users.router)
app.include_router(feedback.router)
app.include_router(meta.router)
app.include_router(chat.router)
app.include_router(test.router)


@app.get("/")
def root():
    return {"message": "Hello from the other side!"}
