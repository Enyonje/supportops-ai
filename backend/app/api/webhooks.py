from fastapi import APIRouter
from app.models.schemas import ZendeskEvent
from app.temporal_config import get_client # Change this line

router = APIRouter()

@router.post("/webhooks/zendesk")
async def handle_zendesk_webhook(event: ZendeskEvent):
    client = await get_client() # Get the initialized client
    await client.start_workflow(
        "SupportTicketWorkflow",
        arg=event.dict(),
        id=f"ticket-{event.id}",
        task_queue="support-tasks"
    )
    return {"status": "workflow_started", "id": event.id}