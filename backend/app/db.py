from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@postgres:5432/supportops"

engine: AsyncEngine = create_async_engine(
    DATABASE_URL,
    echo=True,
)
