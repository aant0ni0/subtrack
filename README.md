# subtrack

A REST API for tracking personal subscriptions — manage your recurring payments, monitor billing cycles, and stay on top of upcoming charges.

Built with **Node.js**, **TypeScript**, **Express**, **Prisma** and **PostgreSQL**. Secured with **JWT authentication**.

---

## Features

- User registration and login with password hashing (bcrypt)
- JWT-based authentication with 7-day token expiry
- Full CRUD for subscription management
- Per-user data isolation — users can only access their own subscriptions
- Input validation with meaningful error messages
- Layered architecture (Controller / Service / Repository)
- Dockerized PostgreSQL database

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20+ |
| Language | TypeScript |
| Framework | Express 5 |
| ORM | Prisma 5 |
| Database | PostgreSQL 16 |
| Auth | JSON Web Tokens (JWT) |
| Validation | Zod |
| Containerization | Docker & Docker Compose |

---

## Project Structure

```
src/
├── controllers/      # Request handling, routing
├── services/         # Business logic
├── repositories/     # Database access via Prisma
├── middleware/        # JWT auth, error handling
├── dtos/             # Zod validation schemas
├── lib/              # Prisma client singleton
├── types/            # TypeScript type extensions
├── app.ts            # Express app setup
└── server.ts         # Server entry point
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/subtrack.git
cd subtrack

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

### Running the App

```bash
# Start the database
docker compose up db -d

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

Server runs at `http://localhost:3000`.

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |

### Subscriptions

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| GET | `/api/subscriptions` | Get all subscriptions | Yes |
| GET | `/api/subscriptions/:id` | Get subscription by ID | Yes |
| POST | `/api/subscriptions` | Create a new subscription | Yes |
| PUT | `/api/subscriptions/:id` | Update a subscription | Yes |
| DELETE | `/api/subscriptions/:id` | Delete a subscription | Yes |

### Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

### Request & Response Examples

**Register**
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "secret123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Create Subscription**
```json
POST /api/subscriptions
{
  "name": "Spotify",
  "price": 24.99,
  "billingCycle": "MONTHLY",
  "nextPaymentDate": "2026-06-01",
  "category": "Music"
}
```

### Subscription Schema

| Field | Type | Required | Constraints |
|---|---|---|---|
| `name` | string | Yes | Non-empty |
| `price` | number | Yes | Greater than 0 |
| `billingCycle` | string | Yes | `MONTHLY` or `YEARLY` |
| `nextPaymentDate` | date | Yes | ISO 8601 format |
| `category` | string | Yes | Non-empty |
| `active` | boolean | No | Defaults to `true` |

---

## Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm run start        # Run compiled production build
npm run db:migrate   # Run database migrations
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio (database GUI)
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/subtrack` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `your-secret-key` |
| `PORT` | Port the server listens on | `3000` |
