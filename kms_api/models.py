from pydantic import BaseModel

class KnowledgeObject(BaseModel):
    url: str
    title: str | None = None
    text: str | None = None
    platform: str | None = None