from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.security import (
    verify_password,
    create_access_token,
)
from app.db.session import get_session
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/login", response_model=TokenResponse)
def login(
    data: LoginRequest,
    session: Session = Depends(get_session),
):
    user = session.exec(
        select(User).where(User.email == data.email)
    ).first()

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})

    return {"access_token": token, "token_type": "bearer"}
