# Notes API + AI Summarization

A production-style RESTful Notes API built with Node.js, Express, PostgreSQL, JWT authentication, and Groq LLM integration.

Submitted for the IEEE × GitHub Campus Experts Codeathon — Backend Track.

This project evolved from a basic CRUD notes API into an AI-enhanced backend system featuring:

* persistent PostgreSQL storage
* authenticated note ownership
* AI-generated summaries
* AI-powered auto-tagging
* resiliency patterns
* retry logic with exponential backoff
* caching layers for performance optimization

---

# Features

## Core API

* Full CRUD operations on notes
* PostgreSQL database persistence
* JWT authentication with protected routes
* Note ownership authorization
* Pagination and sorting
* Semantic HTTP status codes
* Modular MVC architecture

---

## AI Features (Groq Integration)

* AI-generated summaries using Groq API
* Auto-tag generation using LLM analysis
* Summary caching in PostgreSQL
* In-memory caching using hashed note content
* Retry logic with exponential backoff
* Graceful handling of API failures, rate limits, and timeouts

---

# Tech Stack

## Backend

* Node.js (v18+)
* Express.js

## Database

* PostgreSQL

## AI Integration

* Groq API
* llama-3.3-70b-versatile model

## Authentication & Security

* JWT (JSON Web Tokens)
* bcrypt
* dotenv

## Utilities

* crypto
* pg
* groq-sdk

---

# Project Structure

```txt
.
├── config/
│   └── groq.js                # Groq SDK configuration
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
│   ├── noteModel.js
│   └── userModel.js
│
├── routes/
│   ├── auth_route.js
│   └── notes_route.js
│
├── db/
│   └── database.js            # PostgreSQL connection
│
├── .env
├── .env.example
├── package.json
├── README.md
└── server.js
```

---

# Setup

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file:

```env
ACTIVE_PORT=8800

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

---

## 4. Start Server

```bash
node server.js
```

Server runs on:

```txt
http://localhost:8800
```

---

# Authentication

Protected routes require a JWT token.

Example:

```http
Authorization: Bearer <token>
```

---

# AI Endpoints

## Generate Note Summary

```http
GET /notes/:id/summary
```

Generates an AI summary for a note using Groq.

### Behavior

* Returns cached DB summary if available
* Uses in-memory cache for duplicate content
* Retries failed AI requests automatically
* Gracefully handles API failures

### Response

```json
{
  "noteId": "123",
  "summary": "This note explains JWT authentication in Express."
}
```

---

## Generate Tags

```http
GET /notes/:id/tags
```

Uses the LLM to analyze the note and suggest relevant tags.

### Response

```json
{
  "tags": [
    "jwt",
    "authentication",
    "express",
    "backend"
  ]
}
```

---

# Resiliency & Optimization

## Retry Logic

Outgoing Groq API requests implement exponential backoff retries:

```txt
Retry 1 → 1 second
Retry 2 → 2 seconds
Retry 3 → 4 seconds
```

---

## In-Memory Cache

Generated summaries are cached using a SHA-256 hash of note content to prevent duplicate AI requests.

---

## Database Caching

AI-generated summaries and tags are stored directly on the note model to minimize API usage and reduce latency.

---

# Security

* No hardcoded secrets
* Environment variable configuration only
* JWT-protected routes
* Note ownership validation
* Centralized error handling

---

# Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Successful request    |
| 201  | Resource created      |
| 204  | Resource deleted      |
| 400  | Bad request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Resource not found    |
| 429  | Rate limit exceeded   |
| 500  | Internal server error |

---

# Future Improvements

* Redis distributed caching
* Background AI job queues
* Streaming AI responses
* Docker deployment
* Rate limiting middleware
* Unit and integration testing
* Swagger/OpenAPI documentation

---

# Author

Built by Femi Oyetade
IEEE × GitHub Campus Experts Codeathon Day 3 - Backend Track
