import os
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

from app.temporal_config import get_client
from app.audit.logger import create_db_and_tables
from app.api import webhooks, audit, tickets
from app.realtime import manager
from app.database import DATABASE_URL

# -----------------------------------------------------------------------------
# APP INITIALIZATION
# -----------------------------------------------------------------------------
app = FastAPI(title="SupportOps AI Engine")

# -----------------------------------------------------------------------------
# CORS CONFIG (VERCEL + LOCAL)
# -----------------------------------------------------------------------------
VERCEL_FRONTEND = "https://supportops-ai.vercel.app"  # 🔴 CHANGE if needed

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    VERCEL_FRONTEND,
]

# Optional env override (nice for previews)
frontend_env = os.getenv("FRONTEND_URL")
if frontend_env:
    origins.append(frontend_env)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(set(origins)),  # remove duplicates
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# WEBSOCKET (REAL-TIME TICKETS)
# -----------------------------------------------------------------------------
@app.websocket("/ws/tickets")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket)

# -----------------------------------------------------------------------------
# DATABASE READINESS
# -----------------------------------------------------------------------------
async def wait_for_postgres():
    engine = create_async_engine(DATABASE_URL)
    retries = 5

    while retries > 0:
        try:
            async with engine.begin() as conn:
                await conn.execute(text("SELECT 1"))
            print("🐘 Database is ready!")
            return
        except Exception:
            print(f"⏳ Waiting for Database... ({retries} retries left)")
            retries -= 1
            await asyncio.sleep(2)

    raise RuntimeError("❌ Database not reachable")

# -----------------------------------------------------------------------------
# STARTUP
# -----------------------------------------------------------------------------
@app.on_event("startup")
async def startup_event():
    print("🚀 Initializing SupportOps AI Engine...")

    # 1️⃣ Ensure DB is alive
    await wait_for_postgres()

    # 2️⃣ Sync DB tables
    await create_db_and_tables()
    print("✅ Database tables synchronized")

    # 3️⃣ Temporal (OPTIONAL – do not crash app)
    try:
        app.state.temporal_client = await get_client()
        print("🤖 Temporal Orchestrator connected")
    except Exception as e:
        print(f"⚠️ Temporal unavailable, running degraded mode: {e}")
        app.state.temporal_client = None

# -----------------------------------------------------------------------------
# BASIC ROUTES
# -----------------------------------------------------------------------------
@app.get("/")
async def root():
    return {
        "message": "SupportOps AI Engine is running",
        "docs": "/docs",
    }

@app.get("/health")
async def health_check():
    return {
        "status": "online",
        "version": "1.0.0",
        "realtime_engine": "active",
        "temporal": "connected" if app.state.temporal_client else "disabled",
    }

# -----------------------------------------------------------------------------
# API ROUTERS
# -----------------------------------------------------------------------------
app.include_router(webhooks.router, prefix="/api/v1", tags=["Webhooks"])
app.include_router(audit.router, prefix="/api/v1", tags=["Audit"])
app.include_router(tickets.router, prefix="/api/v1", tags=["Tickets"])
