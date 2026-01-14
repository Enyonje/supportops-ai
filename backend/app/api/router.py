from fastapi import APIRouter
from app.routes import auth, users, billing, webhooks
from app.api import autonomous_brain, investor_metrics, revenue_forecast

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(billing.router)
api_router.include_router(webhooks.router)
api_router.include_router(autonomous_brain.router)
api_router.include_router(investor_metrics.router)
api_router.include_router(revenue_forecast.router)