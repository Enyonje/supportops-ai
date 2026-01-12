# app/core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # JWT / Auth
    SECRET_KEY: str = "super-secret-change-me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database
    DATABASE_URL: str = "sqlite:///./test.db"

    # General
    PROJECT_NAME: str = "SupportOps API"
    DEBUG: bool = False

    # Tell Pydantic to load from .env and environment variables
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

# Instantiate settings once and import everywhere
settings = Settings()