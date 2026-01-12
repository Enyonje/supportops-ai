import stripe
from fastapi import APIRouter, Request, Header, HTTPException
from app.core.config import settings
from app.db.session import SessionLocal
from app.models.user import User

stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter(prefix="/webhooks", tags=["Stripe Webhooks"])

@router.post("/stripe")
async def stripe_webhook(
    request: Request,
    stripe_signature: str = Header(None),
):
    payload = await request.body()

    try:
        event = stripe.Webhook.construct_event(
            payload,
            stripe_signature,
            settings.STRIPE_WEBHOOK_SECRET,
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    db = SessionLocal()

    try:
        # ✅ CHECKOUT COMPLETE
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            email = session.get("customer_email")

            user = db.query(User).filter(User.email == email).first()
            if user:
                user.is_active = True
                user.subscription_status = "active"
                user.role = "agent"
                db.commit()

        # 💳 PAYMENT SUCCESS
        elif event["type"] == "invoice.payment_succeeded":
            customer_email = event["data"]["object"]["customer_email"]
            user = db.query(User).filter(User.email == customer_email).first()
            if user:
                user.subscription_status = "active"
                db.commit()

        # ❌ SUBSCRIPTION CANCELED
        elif event["type"] == "customer.subscription.deleted":
            customer_id = event["data"]["object"]["customer"]
            user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
            if user:
                user.subscription_status = "canceled"
                user.role = "viewer"
                db.commit()

    finally:
        db.close()

    return {"status": "ok"}
