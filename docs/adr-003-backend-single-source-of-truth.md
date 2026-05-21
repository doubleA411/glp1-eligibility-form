# ADR-003: Backend as Single Source of Truth

## Status
Accepted

## Context
The form has three pieces of logic that needed a home — the form schema 
(15 screens with prompts, types and options), the branching logic (which 
screen comes next based on the answer), and the eligibility evaluation 
(final result at Screen 15). Two approaches were considered — splitting 
these between frontend and backend, or keeping everything on the backend.

## Decision
All three — schema, branching logic, and eligibility evaluation — live 
on the backend. The frontend only renders what the backend tells it to.

## Reasons
- **Security** — branching logic on the frontend can be manipulated via 
  JavaScript injection. For a medical eligibility form, a patient could 
  bypass disqualifying branches and receive incorrect eligibility results. 
  This is unacceptable in a healthcare context.
- **Single source of truth** — having schema and branching logic in two 
  places means keeping them in sync. Any mismatch between frontend schema 
  and backend logic creates bugs that are hard to trace.
- **Maintainability** — if the form changes (new question, updated branch 
  rule, revised eligibility criteria), only the backend needs updating. 
  No frontend deployment required.
- **Consistency** — all evaluation happens server-side so results are 
  consistent regardless of the client device or browser.

## Alternatives considered
- **Branching logic on frontend** — faster screen transitions (no API call 
  per screen) but introduces security risk and splits logic across two 
  codebases.
- **Schema as static JSON on frontend** — simpler setup but duplicates 
  the schema. Any form update requires both a backend and frontend change.

## Consequences
- An additional API call per screen transition — small latency cost per 
  answer submission.
- An extra endpoint `GET /api/form/schema` not mentioned in the original 
  spec — justified by the single source of truth principle.
- Frontend is intentionally thin — it cannot function without the backend, 
  which is the correct trade-off for a patient-facing healthcare form.