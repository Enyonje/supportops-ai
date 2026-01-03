from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Ticket(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_email: str
    subject: str
    message: str

    ai_reply: Optional[str] = None
    ai_confidence: Optional[int] = None

    status: str = "open"
    created_at: datetime = Field(default_factory=datetime.utcnow)
