import secrets
import json
import jwt
from fastapi import Security, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from kms_api.config import API_KEYS_FILENAME, API_KEY_LENGTH, API_KEY_HEADER_NAME
from kms_api.config import AUTH0_ALGORITHMS, AUTH0_AUDIENCE, AUTH0_ISSUER, AUTH0_DOMAIN

api_key_header = APIKeyHeader(name=API_KEY_HEADER_NAME, auto_error=False)
token_auth_scheme = HTTPBearer()


def create_keys(n=1):
    new_keys = [secrets.token_urlsafe(API_KEY_LENGTH) for i in range(n)]

    keys = get_keys()

    # writes new keys
    with open(API_KEYS_FILENAME, 'w') as f:
        keys.extend(new_keys)
        json.dump(keys, f, indent=4)

    return new_keys


def get_keys():
    # attempts to read existing keys
    try:
        with open(API_KEYS_FILENAME, 'r') as f:
            keys = json.load(f)

    except (FileNotFoundError, json.decoder.JSONDecodeError):
        keys = []

    return keys


async def validate_key(api_key: str = Security(api_key_header)):
    if api_key in get_keys():
        return api_key
    else:
        raise HTTPException(
            status_code=403, detail="Invalid access token"
        )


async def validate_jwt(token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        raise HTTPException(
            status_code=403, detail="Invalid JWT token"
        )
    return result


class VerifyToken():
    """Does all the token verification using PyJWT"""

    def __init__(self, token):
        self.token = token
        jwks_url = f'https://{AUTH0_DOMAIN}/.well-known/jwks.json'
        self.jwks_client = jwt.PyJWKClient(jwks_url)

    def verify(self):
        try:
            self.signing_key = self.jwks_client.get_signing_key_from_jwt(
                self.token
            ).key
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


if __name__ == '__main__':
    import sys
    globals()[sys.argv[1]]()
