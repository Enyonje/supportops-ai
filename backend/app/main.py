from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
import logging

from app.database import init_db, shutdown_db, get_session
from app.api.router import api_router
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

# ✅ CORS setup
allowed_origins = []
if settings.FRONTEND_URL:
    allowed_origins.append(settings.FRONTEND_URL)
# optionally add localhost for dev
allowed_origins.append("http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(api_router, prefix="/api/v1")

@app.get("/db-check")
async def db_check(session: AsyncSession = Depends(get_session)):
    result = await session.execute(text("SELECT 1"))
    return {"status": "ok" if result.scalar() == 1 else "error"}

@app.get("/env-check")
def env_check():
    db_url = settings.DATABASE_URL
    if db_url.startswith("sqlite"):
        db_backend = "SQLite"
    elif "supabase.co" in db_url:
        db_backend = "Supabase/Postgres"
    else:
        db_backend = "Custom"

    return {
        "project_name": settings.PROJECT_NAME,
        "frontend_url": settings.FRONTEND_URL,
        "debug_mode": bool(settings.DEBUG),
        "database_backend": db_backend,
    }