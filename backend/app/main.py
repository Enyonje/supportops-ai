from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_db_and_tables
from app.api.router import api_router   # ✅ central router aggregator

app = FastAPI(
    title="SupportOps AI",
    version="0.1.0",
    openapi_url="/openapi.json",
)

@app.get("/")
def root():
    return {"status": "ok"}

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

# ✅ Include all routers via api_router
app.include_router(api_router, prefix="/api/v1")