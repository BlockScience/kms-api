from pydantic import BaseModel

class KnowledgeObject(BaseModel):
    url: str
    title: str | None
    text: str | None
    platform: str | None

class UpdateKnowledge(BaseModel):
    title: str | None
    text: str | None
    platform: str | None