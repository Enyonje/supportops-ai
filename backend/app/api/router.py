from fastapi import APIRouter
from app.routes import auth, users, billing, brain

api_router = APIRouter()  # ❌ NO prefix here

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(billing.router)
api_router.include_router(brain.router)
