from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Dict, Any
from sqlmodel import SQLModel, Field, JSON, Column



class ZendeskEvent(BaseModel):
    id: str
    subject: str
    description: str
    customer_email: str

class AuditLogEntry(BaseModel):
    ticket_id: str
    event_type: str
    actor: str
    payload: dict

class AuditLog(SQLModel, table=True):
    __tablename__ = "audit_logs"

    id: Optional[int] = Field(default=None, primary_key=True)
    ticket_id: str = Field(index=True)
    event_type: str = Field(index=True)  # e.g., "intent_classified", "policy_denied"
    actor: str  # e.g., "intent_agent", "system"
    payload: Dict[str, Any] = Field(sa_column=Column(JSON)) # The "meat" of the decision
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ZendeskEvent(BaseModel):
    id: str
    subject: str
    description: str
    customer_email: str