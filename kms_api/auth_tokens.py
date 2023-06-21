import jwt
from jose.exceptions import ExpiredSignatureError
from kms_api.config import AUTH0_CLIENT, AUTH0_ALGORITHMS, AUTH0_API_AUDIENCE, AUTH0_ISSUER


class VerifyToken():

    def __init__(self, token):
        self.token = token

        # This gets the JWKS from a given URL and does processing so you can
        # use any of the keys available
        jwks_url = f'https://{AUTH0_CLIENT}.us.auth0.com/.well-known/jwks.json'
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
                audience=AUTH0_API_AUDIENCE,
                issuer=AUTH0_ISSUER,
            )
        except Exception as e:
            return {"status": "error", "message": str(e)}

        return payload
