# Full-Stack To-Do List

# Backend API (FastAPI)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | Get all tasks |
| GET | /todos/{id} | Get a task |
| POST | /todos | Create a task |
| PUT | /todos/{id} | Update task |
| DELETE | /todos/{id} | Delete task |
| GET | /todos/filter/{status} | Filter by status (completed, pending) |

# Setup
1. Backend: `uvicorn app.main:app --reload`
2. Frontend: `npm start`
