from fastapi import APIRouter, Body, Depends, Response, status
from jsonschema import validate
from jsonschema.exceptions import ValidationError

from api.auth import validate_auth
from api.core import firestore_db
from api.schema import FEEDBACK_SCHEMA

router = APIRouter(prefix="/feedback", dependencies=[Depends(validate_auth)])


@router.post("")
def submit_feedback(response: Response, feedback: dict = Body(...)):
    """Takes a feedback JSON and stores it in the database"""
    try:
        validate(feedback, FEEDBACK_SCHEMA)
    except ValidationError as e:
        print(e)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    firestore_db.collection("feedback").add(feedback)

    return {"success": True}
