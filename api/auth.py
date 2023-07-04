import json
import secrets

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.security.api_key import APIKeyHeader

from api.config import (
    API_KEY_HEADER_NAME,
    API_KEY_LENGTH,
    API_KEYS_FILENAME,
)
from api.core import jwtAuth


def create_keys(n=1):
    new_keys = [secrets.token_urlsafe(API_KEY_LENGTH) for i in range(n)]

    keys = get_keys()

    # writes new keys
    with open(API_KEYS_FILENAME, "w") as f:
        keys.extend(new_keys)
        json.dump(keys, f, indent=4)

    return new_keys


def get_keys():
    # attempts to read existing keys
    try:
        with open(API_KEYS_FILENAME) as f:
            keys = json.load(f)

    except (FileNotFoundError, json.decoder.JSONDecodeError):
        keys = []

    return keys


async def validate_key(
    api_key: str = Depends(APIKeyHeader(name=API_KEY_HEADER_NAME, auto_error=False))
):
    if not api_key:
        return None

    if api_key in get_keys():
        return api_key
    else:
        raise HTTPException(status_code=403, detail="Invalid access token")


async def validate_jwt(
    http_auth: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=False)),
):
    if not http_auth:
        return None

    result = jwtAuth.verify(http_auth.credentials)
    if result.get("status"):
        raise HTTPException(status_code=403, detail="Invalid JWT token")
    return result


async def validate_auth(api_key=Depends(validate_key), token=Depends(validate_jwt)):
    if not (api_key or token):
        return True
        # raise HTTPException(
        #     status_code=403, detail="Missing authorization"
        # )


if __name__ == "__main__":
    import sys

    globals()[sys.argv[1]]()
