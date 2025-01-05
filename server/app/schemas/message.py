class MessageCreate(BaseModel):
    content: str
    user_id: int

class MessageOut(BaseModel):
    id: int
    content: str
    user_id: int