from pydantic import BaseModel

class MessageCreate(BaseModel):
    content: str
    user_id: int

class MessageOut(BaseModel):
    id: int
    content: str
    user_id: int

class ChatRequest(BaseModel):
    prompt: str
    max_tokens: int = 150
    temperature: float = 0.7

class ChatResponse(BaseModel):
    response: str