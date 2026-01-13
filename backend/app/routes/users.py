from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List

from app.database import get_session
from app.models.user import User
from app.core.security import hash_password, require_admin   # ✅ import require_admin here
from app.core.deps import require_role

router = APIRouter(prefix="/api/v1/users", tags=["Users"])

# Demo route (optional, remove if not needed)
@router.get("/demo")
def demo_users(admin: User = Depends(require_admin)):
    return [
        {"email": "agent@demo.com", "plan": "pro"},
        {"email": "admin@demo.com", "plan": "business"},
    ]

# Actual route returning users from DB
@router.get("/", response_model=List[User])
def list_users(
    session: Session = Depends(get_session),
    _: User = Depends(require_role("admin"))
):
    return session.exec(select(User)).all()

@router.post("/", response_model=User)
def create_user(
    email: str,
    password: str,
    role: str = "agent",
    session: Session = Depends(get_session),
    _: User = Depends(require_role("admin"))
):
    user = User(
        email=email,
        hashed_password=hash_password(password),
        role=role
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user