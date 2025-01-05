from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter
from typing import List

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