from sqlalchemy import Column, String, Integer, Text
from app.database import Base
import uuid
import datetime

class CustomerHealth(Base):
    __tablename__ = "customer_health"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_id = Column(String, nullable=False)

    health_score = Column(Integer, nullable=False)
    status = Column(String, nullable=False)

    summary = Column(Text)
    created_at = Column(String, default=lambda: datetime.datetime.utcnow().isoformat())
