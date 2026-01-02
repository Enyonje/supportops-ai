from sqlalchemy import Column, String, Float, Text
from app.database import Base
import uuid
import datetime

class ChurnPrediction(Base):
    __tablename__ = "churn_predictions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_id = Column(String, nullable=False)

    churn_probability = Column(Float, nullable=False)
    risk_level = Column(String, nullable=False)

    explanation = Column(Text)
    timestamp = Column(String, default=lambda: datetime.datetime.utcnow().isoformat())
