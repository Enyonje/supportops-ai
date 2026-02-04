from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

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

# ... rest of your middleware, routes, and /db-check