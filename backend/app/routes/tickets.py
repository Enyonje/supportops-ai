from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_session
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketRead

router = APIRouter()

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