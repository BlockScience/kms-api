from fastapi import APIRouter, Depends, Body, Response, status
from starlette.responses import StreamingResponse
from kms_api.auth import validate_auth
from kms_api.schema import CHAT_SCHEMA
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from kms_api.llm.interaction_handler import conversational
from queue import Queue, Empty
from threading import Thread
import asyncio

router = APIRouter(
    prefix="/user/{user_id}/chat",
    dependencies=[Depends(validate_auth)]
)

histories = {}

@router.post("")
def create_chat(user_id: str):
    ...

@router.get("/{chat_id}")
async def get_chat_response(user_id: str, chat_id: str, response: Response, prompt: dict = Body(...)):
    try:
        validate(prompt, CHAT_SCHEMA)
    except ValidationError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}
    
    prompt = prompt["prompt"]

    q = Queue()

    async def task():
        await conversational(prompt, user_id, chat_id, q)
        q.put(False)

    t = Thread(target=asyncio.run, args=(task(),))
    t.start()

    def stream_tokens(q):
        while True:
            try:
                next_token = q.get(False, timeout=1)
                if next_token == False:
                    break
                yield next_token
            except Empty:
                continue
    
    return StreamingResponse(
        content=stream_tokens(q),
        media_type="text/html"
    )

@router.get("")
def get_chats(user_id: str):
    ...

@router.get("/{chat_id}")
def get_chat(user_id: str, chat_id: str):
    ...