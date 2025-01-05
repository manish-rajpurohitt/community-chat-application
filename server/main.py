from fastapi import FastAPI
from app.api import auth as auth_api
from app.api import chat as chat_api
from app.database import create_database
from starlette.middleware.cors import CORSMiddleware
from app.middlewares.middlewares import TokenVerificationMiddleware
import os

create_database()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(TokenVerificationMiddleware)

app.include_router(auth_api.router, prefix="/auth", tags=["users"])

app.include_router(chat_api.router, prefix="/chat", tags=["chat"])
