import jwt

from config import (
    AUTH0_ALGORITHMS,
    AUTH0_AUDIENCE,
    AUTH0_DOMAIN,
    AUTH0_ISSUER,
)


class JWToken:
    """Does all the token verification using PyJWT"""

    def __init__(self):
        jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
        self.jwks_client = jwt.PyJWKClient(jwks_url)

    def verify(self, token: str):
        try:
            self.signing_key = self.jwks_client.get_signing_key_from_jwt(token).key
        except jwt.exceptions.PyJWKClientError as error:
            return {"status": "error", "msg": error.__str__()}
        except jwt.exceptions.DecodeError as error:
            return {"status": "error", "msg": error.__str__()}

        try:
            payload = jwt.decode(
                token,
                self.signing_key,
                algorithms=AUTH0_ALGORITHMS,
                audience=AUTH0_AUDIENCE,
                issuer=AUTH0_ISSUER,
            )
        except Exception as e:
            return {"status": "error", "message": str(e)}

        return payload
