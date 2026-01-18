from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_db_and_tables
from app.api.router import api_router

app = FastAPI(
    title="SupportOps AI",
    version="0.1.0",
)

origins = [
    "https://supportops-ai.vercel.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await create_db_and_tables()

@app.get("/")
def health():
    return {"status": "ok"}

# 🔥 routers AFTER middleware
app.include_router(api_router, prefix="/api/v1")
