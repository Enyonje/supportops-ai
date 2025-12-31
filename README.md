# SupportOps AI 
### Autonomous Customer Support Orchestration Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Temporal](https://img.shields.io/badge/Orchestration-Temporal-white?style=flat&logo=temporal)](https://temporal.io/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

**SupportOps AI** is a production-grade autonomous agent system designed to automate complex, multi-step customer support workflows. Unlike simple chatbots, SupportOps AI uses high-reliability orchestration to handle refunds, escalations, and CRM updates with 100% state persistence.



---

## Key Features

- **Intelligent Intent Classification**: Uses LLM-based agents to determine customer intent (Refund, Technical Support, Escalation) with high precision.
- **Reliable Orchestration**: Powered by **Temporal.io**, ensuring that if a third-party API (like Stripe or Zendesk) fails, the workflow automatically retries without losing data.
- **Automated Financial Actions**: Seamlessly integrated with Stripe for autonomous refund processing based on policy-checked logic.
- **Professional Dashboard**: A high-fidelity React dashboard with real-time metrics, glassmorphism UI, and live ticket tracking.
- **Transparent Audit Trail**: Every AI decision is logged in a PostgreSQL audit store, providing a full "Black Box" history for compliance.

---

## The Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React + Tailwind CSS | Modern, responsive operator dashboard |
| **Orchestrator** | Temporal.io | State management & fault-tolerant workflows |
| **API Gateway** | FastAPI | High-performance asynchronous backend |
| **Database** | PostgreSQL + SQLModel | Audit logging and ticket persistence |
| **AI Engine** | OpenAI / LangChain | Intent analysis and entity extraction |
| **Deployment** | Docker & Netlify | Containerized microservices & edge delivery |

---

## Architecture

The system follows a **Worker-Activity** pattern:
1. **Gateway**: FastAPI receives a webhook from Zendesk.
2. **Orchestrator**: Temporal starts a `SupportTicketWorkflow`.
3. **Intelligence**: An AI Agent activity classifies the ticket.
4. **Action**: Depending on intent, the worker triggers Stripe (Refund) or Zendesk (Update).
5. **Audit**: All results are persisted to Postgres and reflected on the React UI via WebSockets/Polling.

---

## Getting Started

### Prerequisites
- Docker & Docker Compose
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Enyonje/supportops-ai.git](https://github.com/your-username/supportops-ai.git)
   cd supportops-ai