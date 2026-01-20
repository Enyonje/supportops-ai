import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

# 1. Get your Database URL from environment variables
# Make sure it uses asyncpg, e.g.:
# postgresql+asyncpg://postgres:postgres@db:5432/appdb
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Create the Async Engine
engine = create_async_engine(DATABASE_URL, echo=True, future=True)

# 3. Create Session factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# 4. Function to create all tables at startup
async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

# 5. Dependency for FastAPI routes
async def get_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session