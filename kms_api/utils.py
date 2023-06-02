from url_normalize import url_normalize
from base64 import b64encode

def encode_url(string):
    return b64encode(string.encode('ascii')).decode('ascii')