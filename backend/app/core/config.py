from pydantic import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "super-secret-change-me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    class Config:
        env_file = ".env"   # load values from a .env file if present

# ✅ instantiate settings so you can import it anywhere
settings = Settings()