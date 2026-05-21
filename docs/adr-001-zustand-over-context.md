# ADR-001: Zustand over Context API for state management

## Status
Accepted

## Context
The form needs global state shared across the hook, components and page — 
specifically sessionId, currentScreen, answers and result. Two main options 
were considered: React Context API and Zustand.

## Decision
I chose Zustand over Context API.

## Reasons
- Context API triggers a re-render for every component wrapped under the 
  provider when any state value changes, even if that component doesn't 
  consume the changed value.
- Zustand uses slice-based subscriptions — a component only re-renders 
  when the specific slice it subscribes to changes.
- Zustand state is accessible outside React components — useful for the 
  useForm hook pattern where logic is separated from UI.
- No Provider wrapping needed — cleaner component tree.

## Alternatives considered
- **Context API** — simpler setup but re-render problem makes it 
  unsuitable for a form accumulating state across 15 screens.
- **Redux** — more powerful but overkill for this scope. The boilerplate 
  cost isn't justified for a single user flow.

## Consequences
- Slightly heavier dependency than Context (which is built into React).
- Team members unfamiliar with Zustand need a small learning curve.
- State management is clean, predictable and easy to extend if more 
  screens are added.