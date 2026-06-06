# ExpenseTracker

A full-stack expense tracking application built with a Turborepo monorepo structure.

## Tech Stack

- **Mobile**: React Native (Expo)
- **Backend**: Express.js + Bun
- **Database**: PostgreSQL (Supabase) + Prisma ORM
- **Auth**: JWT
- **Rate Limiting**: Upstash Redis
- **Monorepo**: Turborepo

## Project Structure

```
ExpenseTracker/
├── apps/
│ ├── backend/ # Express API (Bun)
│ └── mobile/ # Expo React Native app
├── packages/
│ └── db/ # Prisma schema + client
```


## Prerequisites

- Bun >= 1.0
- Node.js >= 20
- Supabase PostgreSQL database
- Upstash Redis account
- Xcode (for iOS development)


## Setup

```sh
bun install
```

## Environment Variables

### Create .env files:

#### apps/backend/.env
```env
PORT=8080

DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

JWT_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----

UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```
#### packages/db/.env
```env
DATABASE_URL=postgresql://...?pgbouncer=true
DIRECT_URL=postgresql://...
```
#### apps/mobile/.env
```
EXPO_PUBLIC_API_URL=http://localhost:8080
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=...
```

## Run the Project
### Backend
```bash
cd apps/backend
bun run dev
```
### Mobile
```bash
cd apps/mobile
bun run dev
```
Then press:
- ```i``` → iOS simulator
- ```a``` → Android emulator
- ```w``` → web

#### Important Notes:
- Uses ***Expo Dev Client*** (NOT Expo Go)
- Requires native build (```expo run:ios```) at least once
- Prisma uses Supabase Postgres
- Upstash Redis used for rate limiting only

## Scripts
### Backend
```bash
bun run dev
bun run start
```
### DB Package
```bash
bunx prisma generate
bunx prisma migrate dev
bunx prisma studio
```

## Backend (ExpenseTracker API)

Express.js API running on Bun runtime.

### Tech Stack

- Bun (runtime)
- Express.js v5
- Prisma ORM (via `packages/db`)
- JWT authentication
- Upstash Redis (rate limiting)
- PostgreSQL (Supabase)

### Setup

```bash
bun install
bun run dev
```
### API Routes
#### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transactions` | Create transaction |
| GET | `/api/transactions/:userId` | Get user transactions |
| DELETE | `/api/transactions/:id` | Delete transaction |
| GET | `/api/transactions/summary/:userId` | Get summary |

#### Health
```
GET /health
```

#### Environment Variables
```env
PORT=8080

DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

JWT_PUBLIC_KEY=...

UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

#### Scripts
```bash
bun run dev     # development
bun run start   # production
```

## Database Package (Prisma)

Shared Prisma database layer for ExpenseTracker.

### Tech Stack

- Prisma ORM (v7)
- PostgreSQL (Supabase)
- PgBouncer connection pooling


### Setup

```bash
bun install
bunx prisma generate
bunx prisma migrate dev
```
### Usage
```ts
import { prismaClient } from "db/client";

const transactions = await prismaClient.transactions.findMany({
  where: { userId: "user123" },
  orderBy: { created_at: "desc" },
});
```
### Environment Variables
```env
DATABASE_URL=postgresql://...?pgbouncer=true
DIRECT_URL=postgresql://...
```
### Prisma Model
```prisma
model transactions {
  id         Int      @id @default(autoincrement())
  userId     String
  title      String
  amount     Decimal  @db.Decimal(10, 2)
  category   String
  created_at DateTime @default(now())
}
```
### Scripts
```bash
bunx prisma generate
bunx prisma migrate dev
bunx prisma studio
```

## Author

**Deepak Majhi**

