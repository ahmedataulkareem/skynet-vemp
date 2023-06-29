from pydantic import BaseModel

class SummaryPayload(BaseModel):
    text: str

class SummaryResult(BaseModel):
    summary: str
    action_items: list[str]