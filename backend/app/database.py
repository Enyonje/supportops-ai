import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. Get your Database URL from Render environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Create the Async Engine
# We use an async engine because your main.py uses async/await
engine = create_async_engine(DATABASE_URL, echo=True)

# 3. Create SessionLocal
# This is what stripe.py was missing! 
# It creates the factory that generates database connections.
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# 4. Base class for your models
Base = declarative_base()

# Helper to get a database session (used in dependency injection)
async def get_db():
    async with SessionLocal() as session:
        yield session