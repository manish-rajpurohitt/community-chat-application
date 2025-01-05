from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from jose import jwt, JWTError

SECRET_KEY = "drhghdhdrhdrhdrhdrhgrgw4erqadaw"
ALGORITHM = "HS256"

class TokenVerificationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path.startswith("/client"):
            return await call_next(request)
        if request.url.path.startswith("/auth"):
            return await call_next(request)
        
        token = request.headers.get("Authorization")
        if not token or not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Authorization token missing or invalid")

        try:
            token = token[len("Bearer "):]
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            request.state.user = payload
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        return await call_next(request)
