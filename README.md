# subtrack

Subscription tracker REST API built with Node.js, TypeScript, Express, Prisma and PostgreSQL.

## Requirements

- Node.js 20+
- Docker & Docker Compose

## Setup & Run

```bash
# 1. Clone the repo and install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Start the database
docker compose up db -d

# 4. Run migrations
npm run db:migrate

# 5. Start the dev server
npm run dev
```

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/subscriptions
GET    /api/subscriptions/:id
POST   /api/subscriptions
PUT    /api/subscriptions/:id
DELETE /api/subscriptions/:id
```
