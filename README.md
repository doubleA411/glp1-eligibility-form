# GLP-1 Eligibility Form

A 15-screen conditional eligibility screening form for GLP-1 weight-loss medication.

## Stack

- **Frontend** — Next.js 15, React 19, TypeScript, Zustand, Tailwind
- **Backend** — NestJS 11, Prisma 6, PostgreSQL 15
- **Testing** — Vitest 4, Jest, Playwright
- **CI** — GitHub Actions

## Prerequisites

- Node.js 20+
- Docker Desktop

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/doubleA411/glp1-eligibility-form.git
cd glp1-eligibility-form
```

### 2. Start the database

```bash
docker compose up -d
```

### 3. Backend

```bash
cd backend
npm install
npx prisma migrate deploy
npm run start:dev
```

Backend runs at `http://localhost:3000`

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3001`

## Running Tests

### Unit tests (Vitest — eligibility evaluator)

```bash
cd backend
npm run test:unit
```

### API tests (Jest — NestJS endpoints)

```bash
cd backend
npm run test
```

### E2E tests (Playwright)

Make sure both backend and frontend are running, then:

```bash
cd frontend
npx playwright test --project=chromium
```

## Architecture

glp1-eligibility-form/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── form/     # Form schema + eligibility evaluator
│   │   └── session/  # Session management endpoints
│   └── prisma/       # Database schema + migrations
├── frontend/         # Next.js App Router
│   ├── app/          # Pages
│   ├── components/   # UI components (container/presentation pattern)
│   ├── hooks/        # useForm — business logic
│   ├── store/        # Zustand state
│   └── e2e/          # Playwright specs
└── docker-compose.yml


## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/session/start` | Start a new session, returns sessionId + Screen 1 |
| POST | `/api/session/answer` | Save answer, returns next screen or final result |
| GET | `/api/session/:id` | Get session with all saved answers |
| GET | `/api/form/schema` | Get full 15-screen form schema |

## CI

GitHub Actions runs on every PR to `master`:
- Vitest unit tests
- Jest API tests  
- Playwright E2E tests (Chromium)
