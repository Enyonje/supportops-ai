from sqlalchemy import Column, String, DateTime, JSON
from app.database import Base
from datetime import datetime
import uuid

class RCAReport(Base):
    __tablename__ = "rca_reports"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    ticket_id = Column(String, nullable=False)
    tenant_id = Column(String, nullable=False)

    root_cause = Column(String, nullable=False)
    confidence = Column(String, nullable=False)  # e.g. 92%
    suggested_fix = Column(String, nullable=False)

    contributing_factors = Column(JSON, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
