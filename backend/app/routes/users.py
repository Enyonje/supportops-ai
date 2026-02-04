from sqlmodel import SQLModel, Field
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "users"   # explicitly match the DB table name

    id: int | None = Field(default=None, primary_key=True)

    # Use sa_column_kwargs for unique + nullable constraints
    email: str = Field(
        index=True,
        sa_column_kwargs={"unique": True, "nullable": False}
    )

    hashed_password: str = Field(
        sa_column_kwargs={"nullable": False}
    )

    role: str = Field(
        sa_column_kwargs={"nullable": False}
    )

    plan: str = Field(
        sa_column_kwargs={"nullable": False}
    )

    is_active: bool = Field(
        default=True,
        sa_column_kwargs={"nullable": False}
    )

    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column_kwargs={"nullable": False}
    )