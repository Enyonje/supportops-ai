from sqlalchemy import Column, String, Float, Text
from app.database import Base
import uuid
import datetime

class RemediationLog(Base):
    __tablename__ = "remediation_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_id = Column(String, nullable=False)
    action_taken = Column(Text)
    confidence = Column(Float)
    timestamp = Column(String, default=lambda: datetime.datetime.utcnow().isoformat())
