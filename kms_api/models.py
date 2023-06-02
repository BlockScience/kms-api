from pydantic import BaseModel

class KnowledgeObject(BaseModel):
    url: str
    title: str | None
    text: str | None
    platform: str | None