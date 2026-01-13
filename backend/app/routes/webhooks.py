# app/routes/webhooks.py

import stripe
from fastapi import APIRouter, Request, Header, HTTPException, status
from app.core.config import settings
from app.db.session import SessionLocal

router = APIRouter(prefix="/webhooks", tags=["Webhooks"])

# Stripe secret key (server-side ONLY)
stripe.api_key = settings.STRIPE_SECRET_KEY


@router.post("/stripe", status_code=200)
async def stripe_webhook(
    request: Request,
    stripe_signature: str = Header(None),
):
    """
    Handle Stripe webhook events securely
    """
    payload = await request.body()

    if not stripe_signature:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing Stripe signature",
        )

    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=stripe_signature,
            secret=settings.STRIPE_WEBHOOK_SECRET,
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Stripe signature",
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid payload",
        )

    db = SessionLocal()

    try:
        event_type = event["type"]

        # ==============================
        # Subscription Created
        # ==============================
        if event_type == "customer.subscription.created":
            subscription = event["data"]["object"]

            customer_id = subscription["customer"]
            status = subscription["status"]
            price_id = subscription["items"]["data"][0]["price"]["id"]

            # TODO: link Stripe customer → your user
            # Example:
            # user = db.exec(select(User).where(User.stripe_customer_id == customer_id)).first()
            # user.plan = map_price_to_plan(price_id)
            # db.add(user)
            # db.commit()

        # ==============================
        # Subscription Updated
        # ==============================
        elif event_type == "customer.subscription.updated":
            subscription = event["data"]["object"]

            customer_id = subscription["customer"]
            status = subscription["status"]

            # TODO: update plan / status

        # ==============================
        # Subscription Canceled
        # ==============================
        elif event_type == "customer.subscription.deleted":
            subscription = event["data"]["object"]
            customer_id = subscription["customer"]

            # TODO: downgrade user to free plan

        # ==============================
        # Payment Failed
        # ==============================
        elif event_type == "invoice.payment_failed":
            invoice = event["data"]["object"]
            customer_id = invoice["customer"]

            # TODO: notify user / lock premium features

        # ==============================
        # Unhandled Event
        # ==============================
        else:
            pass  # Stripe sends many events; safe to ignore

    finally:
        db.close()

    return {"status": "success"}
