# Mini User Management System

A full-stack User Management System built as part of the Backend Developer Intern Assessment.  
The application supports secure authentication, role-based access control (admin/user), and complete user lifecycle management with a clean API-driven architecture.

---

## Project Overview

This project allows users to sign up, log in, and manage their profiles, while admins can view all users, activate or deactivate accounts, and control access using role-based authorization.  
It demonstrates secure authentication flows, protected APIs, pagination, and production-ready deployment.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JWT Authentication
- bcrypt (password hashing)

### Frontend
- React (Hooks)
- React Router
- Axios
- Tailwind CSS
- Toast notifications

### Database
- MongoDB (Cloud-hosted via MongoDB Atlas)

### Deployment
- Backend: Render
- Frontend: Vercel

---

## Features Implemented

### Authentication
- User signup with validation
- User login with JWT
- Get current logged-in user
- Logout support (token-based)

### Authorization
- Role-based access control (Admin / User)
- Protected routes
- Admin-only APIs and pages

### Admin Capabilities
- View all users with pagination
- Activate or deactivate user accounts

### User Capabilities
- View own profile
- Update name and email
- Change password

### Security
- Password hashing using bcrypt
- JWT-based authentication
- Environment variable based secrets
- Input validation and proper HTTP status codes
- Consistent error response format

---

## Project Structure

BACKEND-INTERN-ASSESMENT
├── backend
│ ├── src
│ ├── package.json
│ └── .env.example
│
├── frontend
│ ├── src
│ ├── package.json
│ └── .env.example
│
└── README.md


---

## Local Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account
- Git

---

### Backend Setup

```bash
cd backend
npm install

# Create a .env file in /backend:

PORT=5500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Start the backend server:

npm run dev

# Backend will run on:

http://localhost:5500 

# Frontend Setup

cd frontend
npm install

# Create a .env file in /frontend:

VITE_API_BASE_URL=http://localhost:5500/api

# Start the frontend:

npm run dev

# Frontend will run on:

http://localhost:5173

## Environment Variables

# Backend

PORT
MONGO_URI
JWT_SECRET

# Frontend

VITE_API_BASE_URL

```

## Deployment Links

# Frontend (Vercel):
- https://usermanagement-pied.vercel.app

# Backend (Render):
- https://backend-user-management-5fl8.onrender.com

## API Documentation

# Postman Collection:
- https://www.postman.com/matinmondal/workspace/public-api-docs/collection/44571133-01c1d665-d071-4fbf-8083-36fa32f6f6a1?action=share&creator=44571133

## The Postman collection includes:

- Authentication APIs
- Admin user management APIs
- User profile APIs
- Example requests and responses (200, 400, 401, 403)

## Sample API Endpoints

# Authentication

- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me

# Admin

- GET /api/users?page=1
- PATCH /api/users/:id/status

# User

- GET /api/users/profile
- PATCH /api/users/profile
- PATCH /api/users/change-password

### Notes for Reviewers

- All sensitive data is stored in environment variables and excluded via .gitignore
- Role-based authorization is enforced at API level
- Pagination is implemented server-side
- Project follows clean folder structure and modular design
- Suitable for production deployment and further scaling

### Author

- Matin Mondal
- Backend Developer Intern Candidate
- GitHub: https://github.com/immatin21/Backend-Intern-Assesment