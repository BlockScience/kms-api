from fastapi import APIRouter, Depends
from kms_api.core import firestore_db
from kms_api.auth import validate_key

router = APIRouter(
    prefix="/user",
    dependencies=[Depends(validate_key)]
)

@router.post("")
def create_user():
    ...

@router.get("/{user_id}")
def get_user():
    ...

@router.put("/{user_id}")
def update_user():
    ...

@router.post("/{user_id}/feedback")
def submit_feedback():
    ...