from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_db_and_tables
from app.api.router import api_router  # ✅ central router aggregator

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
    "http://localhost:5173",               # local dev
    "https://supportops-ai.vercel.app",    # deployed frontend
]

# ✅ CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # restrict to your frontend domains
    allow_credentials=True,
    allow_methods=["*"],       # allow all HTTP methods including OPTIONS
    allow_headers=["*"],       # allow all headers (important for preflight requests)
)

@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()

# ✅ Mount all API routes under /api/v1
app.include_router(api_router, prefix="/api/v1")