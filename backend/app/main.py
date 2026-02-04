from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import init_db, shutdown_db, get_session
from app.api.router import api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # ✅ Startup logic
    await init_db()
    yield
    # ✅ Shutdown logic
    await shutdown_db()

app = FastAPI(
    title="SupportOps AI",
    version="0.1.0",
    lifespan=lifespan,
)

# ✅ CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust for production (e.g., specific domains)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include your API router
app.include_router(api_router)

# ✅ Health check endpoint
@app.get("/db-check")
async def db_check(session: AsyncSession = Depends(get_session)):
    result = await session.execute(text("SELECT 1"))
    return {"status": "ok" if result.scalar() == 1 else "error"}