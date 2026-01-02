from sqlalchemy import Column, String, JSON, Boolean
from app.database import Base
import uuid

class Playbook(Base):
    __tablename__ = "playbooks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(String)
    enabled = Column(Boolean, default=True)

    trigger = Column(JSON, nullable=False)
    conditions = Column(JSON, nullable=True)
    actions = Column(JSON, nullable=False)
