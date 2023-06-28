from fastapi import APIRouter, Depends, Body, Response, status
from kms_api.core import firestore_db
from kms_api.auth import validate_auth
from kms_api.schema import FEEDBACK_SCHEMA
from jsonschema import validate
from jsonschema.exceptions import ValidationError

router = APIRouter(
    prefix="/feedback",
    dependencies=[Depends(validate_auth)]
)

@router.post("")
def submit_feedback(response: Response, feedback: dict = Body(...)):
    try:
        validate(feedback, FEEDBACK_SCHEMA)
    except ValidationError as e:
        print(e)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": e.message}

    firestore_db.collection("feedback").add(feedback)

    return {"success": True}