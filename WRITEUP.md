# WRITEUP.md

## Overview

This is a 15-screen conditional eligibility form for GLP-1 weight-loss medication screening. I approached this with TDD — writing tests before implementation where the spec was clear enough to do so.

**Frontend** — Next.js 15 App Router, React 19, TypeScript, Zustand for state management. I followed a container/presentation pattern — `useForm` hook handles all business logic and API calls, components are pure UI. Session is persisted via sessionId in localStorage, state is restored from backend on reload.

**Backend** — NestJS 11, Prisma 6, PostgreSQL 15. Branching logic, schema, and eligibility evaluation all live on the backend as a single source of truth. The eligibility evaluator is a pure function with 100% branch coverage via Vitest. Branching logic is handled per screen in a switch statement, calling the evaluator at Screen 15 to determine the final result.

---
## Trade-offs

**1. Backend branching logic**

I implemented branching logic in backend rather than frontend, since all the schemas and evaluation logics are present in backend, having the branching logic there keeps a single source of truth. this prevents the manipulation through js injection in frontend, which is very risky in medical / health related forms. tradeoff is an additional API call for screen transitions.

**2. localStorage stores only sessionId**

I store only the sessionId in localStorage, not the answers. On every reload the app fetches the full session state from the backend using that ID and restores the UI from the database response. The alternative was storing answers in localStorage too, but that creates two sources of truth — if the API call fails mid-form, localStorage and the database go out of sync and it's unclear which to trust. I also chose localStorage over sessionStorage because sessionStorage is cleared when the tab closes, which would break the resume flow the spec requires.

**3. Schema served from backend**

I made the schema serve from backend instead of having it as a constant in frontend, as the eval, branching logic all present in backend, so having it there would be a single source of truth. the tradeoff is an extra api route that is not mentioned in the doc. If any changes in form, change in server side is enough so we dont need to change anything in client.

---

## What I'd do differently with another week

**Error boundaries** — adding error boundaries is a must, as a single API failure should not break the whole app. Adding suspense, fallback UI and proper error boundaries would make the app more resilient for a patient facing healthcare form.

**Fix resume flow** — when restoring a session on reload, the current implementation re-submits the last answer to get the current screen which creates a duplicate answer in the database. With more time i'd add a dedicated `GET /api/session/:id/current-screen` endpoint that returns the next screen without saving anything.

**Property based tests** — i'd add property based tests using fast-check for the eligibility evaluator, generating random valid input combinations to verify the evaluator always returns one of the three expected results and never throws or returns an unexpected value.

---

## AI Tools

I used Claude throughout the project for generating boilerplate code, test generation and debugging. I provided the architecture and approach upfront so Claude had context to give better answers. Claude was most helpful in generating the NestJS setup, Prisma service, Vitest and Playwright specs which would have taken significantly more time to write from scratch. Where it slowed me down was the CI pipeline — it took multiple iterations to get the port configuration, build steps and wait-on setup right. The key was treating Claude as a tool to accelerate, not a replacement for understanding — i made sure i could explain every decision and every line of code before moving forward.

---

## Spec Ambiguities

**BMI Screen (Screen 4)** — the spec defines screen 4 as a computed screen with no prompt and no user input, but doesn't mention what the UI should show. i decided to show the calculated BMI value to the user before proceeding, as showing nothing would confuse the patient. this also makes the computed screen feel meaningful rather than just a blank next button.

**Conflicting BP selections (Screen 9)** — the spec doesn't mention what happens when a user selects both Normal and Hypertensive Crisis on the same screen. i decided the most severe selection wins — if Hypertensive Crisis is selected alongside any other option, the result is Clinical Review. this is the safer clinical default for a healthcare form, flagging for review rather than dismissing a potentially dangerous reading.

**Optional review rules** — the spec mentions "daily alcohol + moderate/high risk factors" as a clinical review trigger but never defines what moderate/high risk factors means. i defined it as smoking = yes OR 2 or more unhealthy diet choices (high sugar, high processed foods, frequent sugary beverages). i documented this assumption as the spec was ambiguous.

**Additional API endpoint (GET /api/form/schema)** — the spec only mentions three API endpoints but doesn't specify where the form schema should live. i added a fourth endpoint `GET /api/form/schema` to serve the schema from the backend, as the branching logic and evaluation rules already live there. having the schema in two places would mean keeping them in sync which is a maintenance risk. single source of truth was the cleaner choice.