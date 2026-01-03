import os
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

# 1. Get your Database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Create the Async Engine
engine = create_async_engine(DATABASE_URL, echo=True)

# 3. Create Session factory
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# 4. Function to create all tables at startup
async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

# 5. Dependency for FastAPI routes
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session