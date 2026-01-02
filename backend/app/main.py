from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import tickets, users, auth
from database import create_db_and_tables
from app.api import revenue_forecast
from app.api import investor_metrics
from app.api import autonomous_brain

app.include_router(autonomous_brain.router, prefix="/api/v1")

app.include_router(investor_metrics.router, prefix="/api/v1")

app.include_router(revenue_forecast.router, prefix="/api/v1")

app = FastAPI(title="SupportOps AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await create_db_and_tables()

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tickets.router)
