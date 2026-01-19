# Admin Bypass App

This project is a FastAPI application that includes an admin account feature to bypass authentication for application management. It allows administrators to manage application settings and users without the need for standard authentication.

## Project Structure

```
admin-bypass-app
├── src
│   ├── app.py               # Entry point of the application
│   ├── auth
│   │   ├── __init__.py      # Initializes the auth module
│   │   └── admin.py         # Handles admin account management
│   ├── models
│   │   └── user.py          # Defines the User model
│   ├── routes
│   │   └── management.py     # Defines routes for application management
│   └── database.py          # Handles database connections and session management
├── requirements.txt         # Lists project dependencies
└── README.md                # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd admin-bypass-app
   ```

2. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   Ensure that you have the necessary environment variables set up, particularly for database connections.

4. **Run the application:**
   ```
   uvicorn src.app:app --reload
   ```

## Usage

- Access the application at `http://localhost:8000`.
- Admin users can bypass authentication for management routes.

## Admin Account Feature

The admin account feature allows specific users to manage application settings without standard authentication. This is particularly useful for administrative tasks and can be configured in the `src/auth/admin.py` file. 

Ensure that the admin users are properly defined in the database to utilize this feature effectively.