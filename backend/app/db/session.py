from sqlmodel import Session, create_engine
from app.core.config import settings

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
)

# Dependency used by FastAPI routes
def get_session():
    with Session(engine) as session:
        yield session
