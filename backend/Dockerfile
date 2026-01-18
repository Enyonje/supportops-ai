FROM python:3.11-slim

# -------------------------
# Environment hardening
# -------------------------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=10000

WORKDIR /app

# -------------------------
# System dependencies
# -------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# -------------------------
# Python dependencies
# -------------------------
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# -------------------------
# Application code
# -------------------------
COPY app ./app

# -------------------------
# Expose Render port
# -------------------------
EXPOSE 10000

# -------------------------
# Production server
# -------------------------
CMD ["gunicorn", "app.main:app", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "--bind", "0.0.0.0:10000", \
     "--workers", "2", \
     "--timeout", "120"]
