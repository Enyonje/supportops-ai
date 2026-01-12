from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class User(SQLModel, table=True):
    __tablename__ = "users"

    # 🔑 Primary Key
    id: Optional[int] = Field(default=None, primary_key=True)

    # 👤 Identity
    email: str = Field(
        index=True,
        unique=True,
        nullable=False,
        sa_column_kwargs={"unique": True},
    )
    hashed_password: str

    # 🧑‍💼 Access Control
    role: str = Field(default="viewer")  
    # viewer | agent | admin | investor | management

    is_active: bool = Field(default=False)

    # 💳 Stripe / Billing
    stripe_customer_id: Optional[str] = Field(default=None, index=True)
    subscription_status: str = Field(default="inactive")
    # inactive | active | past_due | canceled

    # 🕒 Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(
        default_factory=datetime.utcnow,
        nullable=False,
    )
