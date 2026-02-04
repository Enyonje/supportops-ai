import os
import logging
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from sqlmodel import SQLModel

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = None
AsyncSessionLocal = None

# Configure logging
logger = logging.getLogger("uvicorn")

def setup_engine():
    """Initialize the async engine and session factory lazily."""
    global engine, AsyncSessionLocal

    if not DATABASE_URL:
        raise RuntimeError("❌ DATABASE_URL is not set. Check your .env or environment variables.")

    engine = create_async_engine(
        DATABASE_URL,
        echo=True,
        future=True,
    )

    AsyncSessionLocal = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )

async def init_db():
    """Create tables at startup and log DB connectivity."""
    if engine is None:
        setup_engine()

    # ✅ Test connectivity with a simple query
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            if result.scalar() == 1:
                logger.info("✅ Connected to Supabase Postgres successfully")
    except Exception as e:
        logger.error(f"❌ Failed to connect to Supabase: {e}")
        raise

    # ✅ Create tables
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def shutdown_db():
    """Dispose of the engine gracefully at shutdown."""
    if engine is not None:
        logger.info("🔻 Closing Supabase DB connections...")
        await engine.dispose()
        logger.info("✅ Supabase DB connections closed")

async def get_session() -> AsyncSession:
    """Dependency for FastAPI routes."""
    if AsyncSessionLocal is None:
        setup_engine()
    async with AsyncSessionLocal() as session:
        yield session