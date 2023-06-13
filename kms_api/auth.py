import secrets
import json
from fastapi import Security, HTTPException
from fastapi.security.api_key import APIKeyHeader
from kms_api.config import API_KEYS_FILENAME, API_KEY_LENGTH, API_KEY_HEADER_NAME

api_key_header = APIKeyHeader(name=API_KEY_HEADER_NAME, auto_error=False)

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

    except (FileNotFoundError, json.decoder.JSONDecodeError) as e:
        keys = []

    return keys

async def validate_key(api_key: str = Security(api_key_header)):
    if api_key in get_keys():
        return api_key
    else:
        raise HTTPException(
            status_code=403, detail="Invalid access token"
        )

if __name__ == '__main__':
    import sys
    globals()[sys.argv[1]]()