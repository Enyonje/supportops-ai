from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from jose import jwt, JWTError

from app.database import get_session
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketRead
from app.core.config import settings  # ✅ use the settings object consistently

router = APIRouter()

# ---------------- WebSocket ----------------
@router.websocket("/ws/tickets")
async def tickets_websocket(websocket: WebSocket):
    token = websocket.query_params.get("token")

    if not token:
        await websocket.close(code=1008)  # Policy violation
        return

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        user_id = payload.get("sub")
        if not user_id:
            raise JWTError()
    except JWTError:
        await websocket.close(code=1008)
        return

    await websocket.accept()

    try:
        while True:
            message = await websocket.receive_text()
            await websocket.send_text(f"received: {message}")
    except WebSocketDisconnect:
        print(f"WebSocket disconnected: user={user_id}")


# ---------------- REST Endpoints ----------------
@router.post("/", response_model=TicketRead)
async def create_ticket(ticket: TicketCreate, session: AsyncSession = Depends(get_session)):
    new_ticket = Ticket(
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        message=ticket.message,
        ai_reply=ticket.ai_reply,
        ai_confidence=ticket.ai_confidence,
        status=ticket.status,
    )
    session.add(new_ticket)
    await session.commit()
    await session.refresh(new_ticket)
    return new_ticket


@router.get("/{ticket_id}", response_model=TicketRead)
async def get_ticket(ticket_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one()
    return ticket