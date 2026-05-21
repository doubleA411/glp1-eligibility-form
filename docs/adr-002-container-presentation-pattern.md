# ADR-002: Container/Presentation Pattern for Frontend Components

## Status
Accepted

## Context
The frontend needs to manage API calls, session state, branching logic 
responses and form progression alongside rendering UI components. Two 
approaches were considered — keeping logic inside components or separating 
it into a dedicated hook.

## Decision
I adopted the container/presentation pattern — all business logic lives 
in `useForm` hook, components are pure UI that consume what the hook returns.

## Reasons
- A single API failure or logic error in a component would break the UI 
  entirely. Separating logic from UI means a hook error doesn't crash 
  the component tree.
- Components become easier to test in isolation — they just receive props 
  and render.
- Business logic in `useForm` is reusable — if a second page or flow needs 
  the same session management, it just calls the same hook.
- Easier to reason about — when something breaks, you know immediately 
  whether it's a UI problem or a logic problem.

## Alternatives considered
- **Logic inside components** — simpler initially but harder to maintain 
  as the form grows. Mixing API calls with JSX makes components hard to 
  read and test.
- **Redux with thunks** — would separate logic but adds significant 
  boilerplate for a project of this scope.

## Consequences
- Slightly more files and indirection — a new developer needs to understand 
  the hook/component split before contributing.
- `page.tsx` becomes very thin — just composing hook and components together 
  which is the intended outcome.
- Pattern scales well — adding new screens or form flows follows the same 
  structure without touching existing components.