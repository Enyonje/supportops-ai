import os

class Settings:
    SECRET_KEY: str = os.getenv("JWT_SECRET", "super-secret-change-me")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

settings = Settings()