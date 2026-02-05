from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
import logging

from app.database import init_db, shutdown_db, get_session
from app.api.router import api_router
from app.core.config import settings

logger = logging.getLogger("uvicorn")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()

    db_url = settings.DATABASE_URL
    if db_url.startswith("sqlite"):
        logger.info("🟢 Running with SQLite (local dev)")
    elif "supabase.co" in db_url:
        logger.info("🌐 Running with Supabase Postgres (production)")
    else:
        logger.info(f"🔧 Running with custom DB backend: {db_url}")

    yield
    await shutdown_db()

app = FastAPI(
    title="SupportOps AI",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/db-check")
async def db_check(session: AsyncSession = Depends(get_session)):
    result = await session.execute(text("SELECT 1"))
    return {"status": "ok" if result.scalar() == 1 else "error"}

# ✅ New safe environment check endpoint
@app.get("/env-check")
def env_check():
    db_url = settings.DATABASE_URL
    db_backend = "SQLite" if db_url.startswith("sqlite") else "Supabase/Postgres" if "supabase.co" in db_url else "Custom"

    return {
        "project_name": settings.PROJECT_NAME,
        "frontend_url": settings.FRONTEND_URL,
        "debug_mode": settings.DEBUG,
        "database_backend": db_backend,
    }