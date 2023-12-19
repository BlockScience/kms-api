from fastapi import APIRouter, Body, Response

from api.llm.models import db

router: APIRouter = APIRouter(prefix="/rag")


@router.post("")
async def get_rag(response: Response, body: dict = Body(...)):
    results = db.similarity_search(body["q"], body["k"])
    return results
