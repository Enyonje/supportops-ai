from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.audit.logger import engine
from app.models.schemas import AuditLog

router = APIRouter()

@router.get("/audit")
async def get_audit_logs():
    with Session(engine) as session:
        # Get the latest 50 logs
        statement = select(AuditLog).order_by(AuditLog.timestamp.desc()).limit(50)
        results = session.exec(statement).all()
        return results