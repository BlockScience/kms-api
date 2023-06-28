from fastapi import APIRouter, Response, Depends, Body, status
from fastapi.security import HTTPBearer
from kms_api.auth import validate_jwt
from pprint import pprint

router = APIRouter(
    prefix="/test",
    dependencies=[Depends(validate_jwt)]
)

# token_auth_scheme = HTTPBearer()


@router.get("")
async def test_get(response: Response) -> dict:
    return {'status': 'success', 'msg': 'here is some secured data'}


@router.post("")
async def test_post(response: Response, data: dict = Body(...)) -> dict:
    pprint(data)
    return {'status': 'success', 'data!': data}
