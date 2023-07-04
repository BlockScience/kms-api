from pprint import pprint

from fastapi import APIRouter, Body, Depends, Response
from starlette.responses import StreamingResponse

from api.auth import validate_auth

router = APIRouter(prefix="/test", dependencies=[Depends(validate_auth)])

# token_auth_scheme = HTTPBearer()


@router.get("")
async def test_get(response: Response) -> dict:
    return {"status": "success", "msg": "here is some secured data"}


@router.post("")
async def test_post(response: Response, data: dict = Body(...)) -> dict:
    pprint(data)
    return {"status": "success", "data!": data}


def get_data_from_file():
    data = ["one", "two", "three", "four", "five"]

    for x in data:
        yield x
        import time

        time.sleep(1)


@router.get("/stream")
async def get_file():
    file_contents = get_data_from_file()
    response = StreamingResponse(content=file_contents, media_type="text/html")
    return response
