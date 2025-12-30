import os
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

# Import your existing modules
from app.temporal_config import get_client
from app.audit.logger import create_db_and_tables
from app.api import webhooks, audit, tickets
from app.realtime import manager
from app.database import DATABASE_URL  # Ensure this path matches your project

app = FastAPI(title="SupportOps AI Engine")

# --- 1. REAL-TIME WEBSOCKET ENDPOINT ---
@app.websocket("/ws/tickets")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # This keeps the connection open and listens for potential client pings
            await websocket.receive_text()  
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket Error: {e}")
        manager.disconnect(websocket)

# --- 2. PRO-LEVEL CORS CONFIGURATION ---
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    os.getenv("FRONTEND_URL", ""), 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in origins if o],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. DATABASE READINESS HELPER ---
async def wait_for_postgres():
    """Wait for Postgres to be ready before starting the app."""
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
            await asyncio.sleep(2)
            retries -= 1
    print("❌ Could not connect to Database.")

# --- 4. STARTUP ORCHESTRATION ---
@app.on_event("startup")
async def startup_event():
    print("🚀 Initializing SupportOps AI Engine...")
    
    # 1. Ensure DB is alive
    await wait_for_postgres()
    
    # 2. Create tables if they don't exist
    await create_db_and_tables()
    print("✅ Database tables synchronized.")

    # 3. Connect to Temporal
    app.state.temporal_client = await get_client()
    if app.state.temporal_client:
        print("🤖 Temporal Orchestrator connected.")
    else:
        print("⚠️ Running WITHOUT Temporal (degraded mode)")

# --- 5. HEALTH MONITORING ---
@app.get("/health")
async def health_check():
    return {
        "status": "online",
        "version": "1.0.0",
        "realtime_engine": "active",
        "temporal": "connected" if app.state.temporal_client else "disconnected"
    }

# --- 6. ROUTER INJECTION ---
app.include_router(webhooks.router, prefix="/api/v1", tags=["Webhooks"])
app.include_router(audit.router, prefix="/api/v1", tags=["Audit"])
app.include_router(tickets.router, prefix="/api/v1", tags=["Tickets"])