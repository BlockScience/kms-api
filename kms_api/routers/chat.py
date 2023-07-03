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
    # dependencies=[Depends(validate_auth)]
)


@router.post("")
def create_chat(user_id: str):
    '''Takes a user ID and creates a new chat for that user. Returns the new chat ID'''
    ...


@router.get("/{chat_id}")
def get_chat_history(user_id: str, chat_id: str):
    '''Takes a user ID and chat ID and returns the chat history for that chat'''
    ...


@router.get("")
def get_chats(user_id: str):
    '''Takes a user ID and returns a list of chat IDs for that user'''
    ...


@router.post("/{chat_id}")
async def get_chat_response(user_id: str, chat_id: str, response: Response, body: dict = Body(...)):
    '''Takes a user ID, chat ID, and a request body and returns a response to that prompt'''
    '''Returns a stream of tokens as they are generated'''
    '''body must include a "prompt" key with a string value'''
    '''body may optionally include an "options" key which conforms to the CHAT_OPTIONS_SCHEMA'''
    try:
        validate(body, CHAT_SCHEMA)
    except ValidationError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    queue = Queue()

    async def task():
        await conversational(body["prompt"], user_id, chat_id, queue)
        queue.put(False)

    t = Thread(target=asyncio.run, args=(task(),))
    t.start()

    def stream_tokens(q):
        while True:
            try:
                next_token = q.get(False, timeout=1)
                if next_token is False:
                    break
                yield next_token
            except Empty:
                continue

    return StreamingResponse(
        content=stream_tokens(queue),
        media_type="text/html"
    )
