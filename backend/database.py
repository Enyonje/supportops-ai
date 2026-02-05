import logging
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from sqlmodel import SQLModel

from app.core.config import settings  # ✅ use your Pydantic settings

# Globals
engine: create_async_engine | None = None
async_session: sessionmaker | None = None

# Configure logging
logger = logging.getLogger("uvicorn")


def setup_engine() -> None:
    """Initialize the async engine and session factory lazily."""
    global engine, async_session

    if not settings.DATABASE_URL:
        raise RuntimeError("❌ DATABASE_URL is not set. Check your .env or environment variables.")

    # ✅ Must be asyncpg driver
    if not settings.DATABASE_URL.startswith("postgresql+asyncpg"):
        raise RuntimeError("❌ DATABASE_URL must use asyncpg driver for async engine")

    engine = create_async_engine(
        settings.DATABASE_URL,
        echo=True,
        future=True,
    )

    async_session = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )


async def init_db() -> None:
    """Create tables at startup and log DB connectivity."""
    if engine is None:
        setup_engine()

    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            if result.scalar() == 1:
                logger.info("✅ Connected to database successfully")
    except Exception as e:
        logger.error(f"❌ Failed to connect to database: {e}")
        raise

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def shutdown_db() -> None:
    """Dispose of the engine gracefully at shutdown."""
    if engine is not None:
        logger.info("🔻 Closing DB connections...")
        await engine.dispose()
        logger.info("✅ DB connections closed")


async def get_session() -> AsyncSession:
    """Dependency for FastAPI routes."""
    if async_session is None:
        setup_engine()
    async with async_session() as session:
        yield session