from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from app.database import get_session
from app.models.user import User
from app.core.security import verify_password, hash_password
from app.core.jwt import create_access_token

router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])

@router.post("/login")
def login(
    form: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = session.exec(
        select(User).where(User.email == form.username)
    ).first()

    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": user.id,
        "role": user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }

@router.post("/register")
def register(
    email: str,
    password: str,
    session: Session = Depends(get_session)
):
    if session.exec(select(User).where(User.email == email)).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        email=email,
        hashed_password=hash_password(password),
        role="agent"
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    token = create_access_token({"sub": user.id, "role": user.role})

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role
    }
