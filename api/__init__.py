from fastapi import FastAPI
from api.routers import knowledge, proposals, users, feedback, meta, test
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(knowledge.router)
app.include_router(proposals.router)
app.include_router(users.router)
app.include_router(feedback.router)
app.include_router(meta.router)
app.include_router(test.router)

origins = ["https://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello from the other side!"}
