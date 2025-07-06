# 🚀 Task Management App - Backend

A scalable and efficient backend API for a Task Management App, developed using **FastAPI**, secured with **JWT Authentication**, powered by **Supabase** database, and containerized with **Docker** for easy deployment.  
📌 Swagger Documentation: [https://api.tribber.live/docs](https://api.tribber.live/docs)

---

## 📄 Description

This backend service provides core features for a task management system, including **user authentication** and **task CRUD operations**. Built with modern, lightweight technologies and deployed on **AWS EC2** for high availability.

---

## 🔑 Core Features

### 🧑‍💼 User Authentication

- ✅ Sign up
- 🔓 Sign in
- 🚪 Logout
- 👤 Fetch current user data
- 🗑️ Delete account

### ✅ Task Management

- 📋 View user's task list
- ➕ Create a new task
- ✏️ Update existing task
- ❌ Delete task

---

## 🧪 API Endpoints

### 🔐 Authentication

| Method   | Endpoint              | Description           |
| -------- | --------------------- | --------------------- |
| `POST`   | `/api/v1/auth/signup` | Register a new user   |
| `POST`   | `/api/v1/auth/signin` | Login user            |
| `GET`    | `/api/v1/auth/me`     | Get current user info |
| `GET`    | `/api/v1/auth/logout` | Logout user           |
| `DELETE` | `/api/v1/auth/delete` | Delete user account   |

### 🗂️ Task Management

| Method   | Endpoint                        | Description         |
| -------- | ------------------------------- | ------------------- |
| `GET`    | `/api/v1/task/get`              | Fetch user's tasks  |
| `POST`   | `/api/v1/task/create`           | Create a new task   |
| `PUT`    | `/api/v1/task/update/{task_id}` | Update a task by ID |
| `DELETE` | `/api/v1/task/delete/{task_id}` | Delete a task by ID |

---

## ⚙️ Tech Stack

- **Backend Framework**: FastAPI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT via FastAPI
- **Deployment**: AWS EC2
- **Containerization**: Docker & Docker Compose

---

## 🛠️ Local Setup & Installation

### 📌 Prerequisites

Make sure the following tools are installed:

- Python 3.9+
- Pip
- Virtualenv _(optional but recommended)_
- Docker & Docker Compose

Prepare your `.env` file using the structure from `.env.local`.

---

### ▶️ Run Without Docker

```bash
# 1. Clone the repository
git clone https://github.com/tribber93/Back-End_Task-Management-App.git
cd Back-End_Task-Management-App

# 2. Create & activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate         # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start the FastAPI server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

🔗 Your backend will be available at `http://localhost:8000`  
🧪 Access Swagger UI at `http://localhost:8000/docs`

---

### 🐳 Run with Docker Compose

```bash
docker-compose up --build -d
```

📦 Backend is served at `http://localhost:8000`

---

## 📬 Contact & Source

💻 GitHub: [github.com/tribber93/Back-End_Task-Management-App](https://github.com/tribber93/Back-End_Task-Management-App)  
✉️ For any issues or suggestions, feel free to open an issue or pull request!

---
