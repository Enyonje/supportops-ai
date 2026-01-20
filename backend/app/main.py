from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_db_and_tables
from app.api.router import api_router

# Lifespan handler replaces @app.on_event
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    await create_db_and_tables()
    yield
    # Shutdown logic (optional)
    # e.g., close connections, cleanup tasks

app = FastAPI(
    title="SupportOps AI",
    version="0.1.0",
    lifespan=lifespan,
)

# ✅ Allowed origins for CORS
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

# ✅ Simple health check route
@app.get("/health")
async def health():
    return {"status": "ok"}

# ✅ Include API routers after middleware
app.include_router(api_router, prefix="/api/v1")