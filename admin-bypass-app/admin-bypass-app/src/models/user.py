from sqlalchemy import Column, Integer, String, Boolean
from sqlmodel import SQLModel

class User(SQLModel, table=True):
    id: int = Column(Integer, primary_key=True, index=True)
    username: str = Column(String, unique=True, index=True)
    password: str = Column(String)
    is_admin: bool = Column(Boolean, default=False)