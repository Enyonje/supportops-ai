from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import BaseModel

from app.database import get_session
from app.models.user import User
from app.core.security import verify_password, hash_password
from app.core.jwt import create_access_token

router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])

# ---------- Schemas ----------
class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    email: str
    name: str

# ---------- Login ----------
@router.post("/login", response_model=AuthResponse)
def login(
    form: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = session.exec(select(User).where(User.email == form.username)).first()

    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "email": user.email,
        "name": user.name,
    }

# ---------- Register ----------
@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest, session: Session = Depends(get_session)):
    # Check if email already exists
    if session.exec(select(User).where(User.email == payload.email)).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    # Create new user
    user = User(
        email=payload.email,
        name=payload.name,
        hashed_password=hash_password(payload.password),
        role="agent"  # default role
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "email": user.email,
        "name": user.name,
    }