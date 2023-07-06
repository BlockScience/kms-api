from fastapi import APIRouter, Depends, Body, Response, status
from api.core import firestore_db
from api.auth import validate_auth
from api.schema import USER_SCHEMA
from jsonschema import validate
from jsonschema.exceptions import ValidationError

router = APIRouter(prefix="/user", dependencies=[Depends(validate_auth)])


@router.post("/{user_id}")
def set_user(response: Response, user_id: str, user: dict = Body(...)):
    try:
        validate(user, USER_SCHEMA)
    except ValidationError as e:
        print(e)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    firestore_db.collection("users").document(user_id).set(user)
    return user


@router.get("/{user_id}")
def get_user(user_id: str):
    user = firestore_db.collection("users").document(user_id).get().to_dict()
    return user
