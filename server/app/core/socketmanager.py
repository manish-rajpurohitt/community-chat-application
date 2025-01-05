from starlette.websockets import WebSocket, WebSocketDisconnect

class SocketManager:
    def __init__(self):
        self.connections = {}
    
    async def connect(self, socket: WebSocket, client_id: str):
        print("Connecting Socket... " + client_id)
        await socket.accept()
        self.connections[client_id] = socket
        for id in self.connections.keys():
            await self.connections[id].send_text(f"#{client_id} joined the chat!")
        print("Sent Connected Message...")
        
        try:
            while True:
                data = await self.connections[client_id].receive_text()
                if data:
                    await self.send_community_message(client_id, data)
        except WebSocketDisconnect:
            print(f"Client {client_id} disconnected.")
        except Exception as e:
            print(f"Unexpected error with client {client_id}: {e}")
        finally:
            await self.disconnect(client_id)
    
    async def disconnect(self, client_id: str):
        if client_id in self.connections:
            print("Disconnecting Socket... " + client_id)
            try:
                await self.connections[client_id].close()
            except Exception as e:
                print(f"Error closing socket for {client_id}: {e}")
            finally:
                del self.connections[client_id]
            
            for id in self.connections.keys():
                await self.connections[id].send_text(f"#{client_id} left the chat!")
    
    async def send_private(self, to_client_id: str, message):
        if to_client_id in self.connections:
            await self.connections[to_client_id].send_text(message)
    
    async def send_community_message(self, client_id: str, text: str):
        for id in self.connections.keys():
            await self.connections[id].send_text(f"#{client_id} : {text}")
