from fastapi import APIRouter, Body, Depends, Response, status
from jsonschema import validate
from jsonschema.exceptions import ValidationError

from api.auth import validate_auth
from api.core import firestore_db
from api.schema import USER_SCHEMA

router: APIRouter = APIRouter(prefix="/user", dependencies=[Depends(validate_auth)])


@router.post("/{user_id}")
def set_user(response: Response, user_id: str, user: dict = Body(...)):
    """Takes a user ID and JSON and sets the data for that user"""
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
    """Takes a user ID and returns that user object"""
    user = firestore_db.collection("users").document(user_id).get().to_dict()
    return user
