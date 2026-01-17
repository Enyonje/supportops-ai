from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_db_and_tables
from app.api.router import api_router

app = FastAPI(
    title="SupportOps AI",
    version="0.1.0",
    openapi_url="/openapi.json",
)

# ✅ MUST be defined BEFORE routes
origins = [
    "http://localhost:5173",
    "https://supportops-ai.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # ❗ explicit, not "*"
    allow_credentials=True,
    allow_methods=["*"],          # allows OPTIONS
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()

@app.get("/")
def root():
    return {"status": "ok"}

# ✅ routers come AFTER middleware
app.include_router(api_router, prefix="/api/v1")
