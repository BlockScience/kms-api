from fastapi import APIRouter, Response, Depends, Body, Request, status
from fastapi.security import HTTPBearer
from kms_api.auth import jwt_or_key_auth, jwt_auth
from pprint import pprint
from kms_api.auth_tokens import VerifyToken

router = APIRouter(
    prefix="/test",
    # dependencies=[Depends(jwt_auth)]
)

token_auth_scheme = HTTPBearer()


@router.get("")
async def test_get(response: Response, request: Request, token: str = Depends(token_auth_scheme)) -> dict:
    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    # pprint(token)
    # pprint(result)
    pprint(result)
    return {'status': 'success', 'msg': 'here is some secured data'}
    # if result.get("status"):
    #     response.status_code = status.HTTP_100_CONTINUE
    #     return result


# @router.post("")
# def test_post(response: Response, request: Request, obj: dict = Body(...), token: str = Depends(token_auth_scheme)):
#     result = VerifyToken(token.credentials).verify()
#     if result.get("status"):
#         response.status_code = status.HTTP_100_CONTINUE
#         return result
#     pprint(request.__dict__)
#     return {'status': 'success'}
