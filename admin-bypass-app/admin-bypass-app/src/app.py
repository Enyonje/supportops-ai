from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import management

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(management.router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Admin Bypass App"}