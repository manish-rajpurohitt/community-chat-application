from sqlalchemy.orm import Session
from app.models.user import User
from app import schemas
from passlib.context import CryptContext
from fastapi import HTTPException

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = User(email=user.email, hashed_password=get_pasword_hashed(user.password), full_name=user.full_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_pasword_hashed(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except:
        return None


def update_password_hash(user: User, db: Session):
    new_hashed_password = pwd_context.hash(user.password)
    user.hashed_password = new_hashed_password
    db.commit()
    db.refresh(user)