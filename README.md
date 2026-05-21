# GLP-1 Eligibility Form

![CI](https://github.com/doubleA411/glp1-eligibility-form/actions/workflows/ci.yml/badge.svg)


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

```
glp1-eligibility-form/
├── backend/
│   ├── src/
│   │   ├── form/
│   │   │   ├── form.schema.ts
│   │   │   ├── form.controller.ts
│   │   │   ├── eligibility.evaluator.ts
│   │   │   └── eligibility.evaluator.spec.ts
│   │   ├── session/
│   │   │   ├── session.controller.ts
│   │   │   ├── session.service.ts
│   │   │   └── session.service.spec.ts
│   │   └── prisma.service.ts
│   └── prisma/
│       └── schema.prisma
├── frontend/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   ├── inputs/
│   │   │   ├── NumberInput.tsx
│   │   │   ├── RadioInput.tsx
│   │   │   └── CheckboxInput.tsx
│   │   ├── FormScreen.tsx
│   │   └── ResultScreen.tsx
│   ├── hooks/
│   │   └── useForm.ts
│   ├── store/
│   │   └── formStore.ts
│   └── e2e/
│       ├── happy-path.spec.ts
│       ├── resume.spec.ts
│       ├── terminal-state.spec.ts
│       └── edge-case.spec.ts
└── docker-compose.yml
```


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
