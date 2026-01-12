from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import tickets, users, auth
from app.database import create_db_and_tables

from app.api import revenue_forecast, investor_metrics, autonomous_brain
from app.routes import billing
from app.routes import webhooks



app = FastAPI(title="SupportOps AI")

# ✅ Explicitly list allowed origins
origins = [
    "http://localhost:5173",              # local dev
    "https://supportops-ai.vercel.app",   # deployed frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()

# Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(tickets.router, prefix="/api/v1")
app.include_router(autonomous_brain.router, prefix="/api/v1")
app.include_router(investor_metrics.router, prefix="/api/v1")
app.include_router(revenue_forecast.router, prefix="/api/v1")
app.include_router(billing.router, prefix="/api/v1")
app.include_router(webhooks.router)