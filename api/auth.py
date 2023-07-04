import json
import secrets

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.security.api_key import APIKeyHeader

from api.config import (
    API_KEY_HEADER_NAME,
    API_KEY_LENGTH,
    API_KEYS_FILENAME,
    AUTH0_ALGORITHMS,
    AUTH0_AUDIENCE,
    AUTH0_DOMAIN,
    AUTH0_ISSUER,
)


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
    token: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=False)),
):
    if not token:
        return None

    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        raise HTTPException(status_code=403, detail="Invalid JWT token")
    return result


async def validate_auth(api_key=Depends(validate_key), token=Depends(validate_jwt)):
    if not (api_key or token):
        return True
        # raise HTTPException(
        #     status_code=403, detail="Missing authorization"
        # )


class VerifyToken:
    """Does all the token verification using PyJWT"""

    def __init__(self, token):
        self.token = token
        jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
        self.jwks_client = jwt.PyJWKClient(jwks_url)

    def verify(self):
        try:
            self.signing_key = self.jwks_client.get_signing_key_from_jwt(self.token).key
        except jwt.exceptions.PyJWKClientError as error:
            return {"status": "error", "msg": error.__str__()}
        except jwt.exceptions.DecodeError as error:
            return {"status": "error", "msg": error.__str__()}

        try:
            payload = jwt.decode(
                self.token,
                self.signing_key,
                algorithms=AUTH0_ALGORITHMS,
                audience=AUTH0_AUDIENCE,
                issuer=AUTH0_ISSUER,
            )
        except Exception as e:
            return {"status": "error", "message": str(e)}

        return payload


if __name__ == "__main__":
    import sys

    globals()[sys.argv[1]]()
