# Notes API + AI Summarization ── Day 3

A production-style RESTful Notes API built with **Node.js**, **Express**, **PostgreSQL**, **JWT authentication**, and **Groq LLM integration**.

Built for the IEEE × GitHub Campus Experts Codeathon — Backend Track.

---

# Overview

This project evolved across three stages:

| Day   | Focus                                                         |
| ----- | ------------------------------------------------------------- |
| Day 1 | REST fundamentals, semantic HTTP status codes, in-memory CRUD |
| Day 2 | PostgreSQL persistence, JWT auth, bcrypt hashing              |
| Day 3 | Groq AI integration, caching, resiliency, fault tolerance     |

The Day 3 layer introduces AI-powered note summarization and auto-tag generation with retry logic, graceful degradation, and multi-level caching to reduce latency and API cost.

---

# Features

## Core API Features

* Full CRUD operations on notes
* PostgreSQL database persistence
* User registration and login
* JWT-protected routes
* bcrypt password hashing
* Ownership-based authorization
* Pagination and sorting
* Centralized error handling
* Modular MVC architecture
* Semantic HTTP status codes

## AI Features

* AI-generated summaries using Groq
* Automatic note tagging
* Database caching for generated AI output
* SHA-256 in-memory cache
* Retry logic with exponential backoff
* Graceful AI failure handling
* Reduced API credit consumption

---

# Tech Stack

| Layer              | Technology                           |
| ------------------ | ------------------------------------ |
| Runtime            | Node.js (v18+)                       |
| Framework          | Express.js                           |
| Database           | PostgreSQL 18                        |
| AI Integration     | Groq API (`llama-3.3-70b-versatile`) |
| Authentication     | JWT (`jsonwebtoken`)                 |
| Password Security  | bcryptjs                             |
| Environment Config | dotenv                               |
| Utilities          | pg, groq-sdk, crypto                 |

---

# Project Structure

```txt
.
├── config/
│   └── groq.js
│
├── controllers/
│   ├── auth_controller.js
│   └── notes_controller.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── userModel.js
│   └── noteModel.js
│
├── routes/
│   ├── auth_route.js
│   └── notes_route.js
│
├── db/
│   └── database.js
│
├── server.js
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# Database Schema

## `profile` Table

| Column    | Type         | Constraints      |
| --------- | ------------ | ---------------- |
| id        | SERIAL       | Primary Key      |
| public_id | UUID         | Auto-generated   |
| username  | VARCHAR(255) | Unique, NOT NULL |
| password  | TEXT         | bcrypt hash      |

---

## `note` Table

| Column     | Type        | Constraints        |
| ---------- | ----------- | ------------------ |
| id         | SERIAL      | Primary Key        |
| public_id  | UUID        | Auto-generated     |
| title      | TEXT        | NOT NULL           |
| body       | TEXT        | Optional           |
| summary    | TEXT        | AI-generated cache |
| tags       | TEXT[]      | AI-generated cache |
| created_at | TIMESTAMPTZ | Default NOW()      |
| updated_at | TIMESTAMPTZ | Auto-updated       |
| profile_id | UUID        | Foreign key        |

The `summary` and `tags` columns act as the persistent database cache for AI-generated results.

---

# Quick Start

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file:

```env
ACTIVE_PORT=8800

DB_USER=postgres
DB_HOST=localhost
DB_NAME=notes_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

> Never commit `.env` files to GitHub.

---

## 4. Start the Server

```bash
npm run dev
```

Expected output:

```txt
Database connected Successfully
Server is ACTIVE🔥🔥 on http://localhost:8800
```

---

# Authentication

Protected routes require a JWT:

```http
Authorization: Bearer <token>
```

---

## Register User

### `POST /auth/register`

```json
{
  "username": "femiprecious",
  "password": "supersecret123"
}
```

### Response — `201 Created`

```json
{
  "message": "Account Created Successfully"
}
```

---

## Login User

### `POST /auth/login`

```json
{
  "username": "femiprecious",
  "password": "supersecret123"
}
```

### Response — `200 OK`

```json
{
  "token": "jwt-token"
}
```

---

# Notes Endpoints

All `/notes` routes require authentication.

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| POST   | `/notes`     | Create note     |
| GET    | `/notes`     | Get all notes   |
| GET    | `/notes/:id` | Get single note |
| PUT    | `/notes/:id` | Replace note    |
| PATCH  | `/notes/:id` | Partial update  |
| DELETE | `/notes/:id` | Delete note     |

---

## Pagination & Sorting

Example:

```http
GET /notes?page=1&limit=10&sort=created_at
```

---

# AI Endpoints

## Generate Summary

### `GET /notes/:id/summary`

Uses Groq's `llama-3.3-70b-versatile` model to summarize note content.

### Response

```json
{
  "noteId": "uuid",
  "summary": "This note explains JWT authentication."
}
```

---

## Generate Tags

### `GET /notes/:id/tags`

### Response

```json
{
  "tags": ["jwt", "authentication", "express"]
}
```

---

# AI Caching Flow

```txt
Request
  ↓
Database Cache
  ↓
In-Memory Cache
  ↓
Groq API
  ↓
Store Result
  ↓
Response
```

---

# Resiliency Strategy

## Exponential Backoff

```txt
Retry 1 → 1 second
Retry 2 → 2 seconds
Retry 3 → 4 seconds
```

External AI services are treated as unreliable network dependencies. Failed requests retry automatically and degrade gracefully instead of crashing the application.

---

# Security

* JWT-protected routes
* bcrypt password hashing
* Ownership-based authorization
* Environment variable secrets management
* No raw stack traces exposed
* `.env` excluded from version control

---

# Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Successful request    |
| 201  | Resource created      |
| 204  | Successful deletion   |
| 400  | Bad request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Resource not found    |
| 409  | Conflict              |
| 429  | Too many requests     |
| 500  | Internal server error |

---

# Future Improvements

* Redis distributed caching
* Docker deployment
* Swagger/OpenAPI docs
* Background job queues
* Streaming AI responses
* Unit and integration tests
* Dedicated rate limiting

---

# Author

Built by **Femi Oyetade**

IEEE × GitHub Campus Experts Codeathon — Backend Track
