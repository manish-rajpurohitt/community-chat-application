from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter,HTTPException
from typing import List
from app.schemas.message import ChatResponse, ChatRequest
from app.crud.message import get_chat_response
from app.core.socketmanager import SocketManager

router = APIRouter()

clients: List[WebSocket] = []

socketmanager = SocketManager()

@router.websocket("/ws/community/connect/{client_id}")
async def chat(websocket: WebSocket, client_id: str):
    try:
        await socketmanager.connect(websocket, client_id)
       
                
    except WebSocketDisconnect:
        await socketmanager.disconnect(client_id)

@router.websocket("/ws/community/send/{client_id}")
async def chat(websocket: WebSocket, client_id: str):
    try:
        await socketmanager.send_community_message(client_id)
    except WebSocketDisconnect:
        await socketmanager.disconnect(client_id)

@router.get("/getAllUsers")
async def get_all_users():
        data = { "users": await socketmanager.get_all_users()}
        return data

@router.post("/enhanceText", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        prompt_text = f"Enhance the following message for improved grammar, vocabulary, and clarity. Ensure the tone remains professional and enrich the text where necessary. message={request.prompt}"
        response_text = get_chat_response(
            prompt=prompt_text,
            max_tokens=request.max_tokens,
            temperature=request.temperature
        )
        return ChatResponse(response=response_text)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))