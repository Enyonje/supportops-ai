from sqlalchemy import Column, String, Boolean
from app.database import Base
import uuid

class TenantBranding(Base):
    __tablename__ = "tenant_branding"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, unique=True, nullable=False)

    app_name = Column(String, default="SupportOps")
    logo_url = Column(String, nullable=True)

    primary_color = Column(String, default="#2563EB")
    accent_color = Column(String, default="#6366F1")

    custom_domain = Column(String, nullable=True)
    white_label = Column(Boolean, default=False)

