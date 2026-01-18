import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlmodel import SQLModel
from app.db.session import engine

async def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# 1. Base class for your models
Base = declarative_base()

# 2. Get your Database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# 3. Create the Async Engine
engine = create_async_engine(DATABASE_URL, echo=True)

# 4. Create Session factory
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# 5. Function to create all tables at startup
async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

# 6. Dependency for FastAPI routes
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session