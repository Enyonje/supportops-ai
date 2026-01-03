from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import tickets, users, auth
from app.database import create_db_and_tables

from app.api import revenue_forecast
from app.api import investor_metrics
from app.api import autonomous_brain

# ✅ CREATE APP FIRST
app = FastAPI(title="SupportOps AI")

# ✅ MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ STARTUP EVENT (ASYNC FUNCTION)
@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()

# ✅ ROUTERS (API v1)
app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(tickets.router, prefix="/api/v1")

app.include_router(autonomous_brain.router, prefix="/api/v1")
app.include_router(investor_metrics.router, prefix="/api/v1")
app.include_router(revenue_forecast.router, prefix="/api/v1")