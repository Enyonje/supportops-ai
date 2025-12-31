import os
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

# --- 1. IMPORT MODULES ---
from app.temporal_config import get_client
from app.audit.logger import create_db_and_tables
from app.api import webhooks, audit, tickets, stripe  # Added stripe here
from app.realtime import manager
from app.database import DATABASE_URL

# --- 2. INITIALIZE APP ---
app = FastAPI(title="SupportOps AI Engine")

# --- 3. CORS CONFIGURATION ---
# This allows your Vercel frontend to talk to your Render backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://supportops-ai.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 4. REGISTER ROUTERS ---
# All your API endpoints are now organized under /api/v1
app.include_router(stripe.router, prefix="/api/v1/stripe", tags=["Billing"])
app.include_router(webhooks.router, prefix="/api/v1", tags=["Webhooks"])
app.include_router(audit.router, prefix="/api/v1", tags=["Audit"])
app.include_router(tickets.router, prefix="/api/v1", tags=["Tickets"])

# --- 5. WEBSOCKETS (Real-time) ---
@app.websocket("/ws/tickets")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket Error: {e}")
        manager.disconnect(websocket)

# --- 6. STARTUP LOGIC & HELPERS ---
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
            await asyncio.sleep(2)
            retries -= 1

@app.on_event("startup")
async def startup_event():
    print("🚀 Initializing SupportOps AI Engine...")
    
    # 1. Wait for DB and create tables
    await wait_for_postgres()
    await create_db_and_tables()
    print("✅ Database tables synchronized.")

    # 2. Connect to Temporal
    app.state.temporal_client = await get_client()
    if app.state.temporal_client:
        print("🤖 Temporal Orchestrator connected.")
    else:
        print("⚠️ Running WITHOUT Temporal (degraded mode)")

# --- 7. BASIC ENDPOINTS ---
@app.get("/")
async def root():
    return {"message": "SupportOps AI Engine is running", "docs": "/docs"}

@app.get("/health")
async def health_check():
    return {
        "status": "online",
        "temporal": "connected" if hasattr(app.state, 'temporal_client') and app.state.temporal_client else "disconnected"
    }