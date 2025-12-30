import os
import time
from temporalio import activity
from sqlmodel import Session, SQLModel, create_engine
from sqlalchemy.exc import OperationalError
from app.database import engine

# Define engine
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@postgres:5432/supportops")
engine = create_engine(DATABASE_URL)

# Ensure THIS EXACT NAME is defined here
def create_db_and_tables():
    """Retries database connection until Postgres is ready."""
    print("⏳ Waiting for Postgres to be ready...")
    for attempt in range(10):
        try:
            SQLModel.metadata.create_all(engine)
            print("✅ Database tables created successfully!")
            return
        except OperationalError:
            print(f"Postgres not ready (attempt {attempt + 1}/10)... retrying in 2s")
            time.sleep(2)
    raise RuntimeError("Could not connect to Postgres after multiple attempts.")

@activity.defn()
async def log_escalation_activity(data: dict):
    return {"status": "escalated_logged"}

@activity.defn()
async def log_final_success_activity(data: dict):
    return {"status": "success_logged"}