# app/core/config.py
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # JWT / Auth
    SECRET_KEY: str = os.getenv("JWT_SECRET", "super-secret-change-me")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")

    # General
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "SupportOps API")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"

    class Config:
        env_file = ".env"

settings = Settings()