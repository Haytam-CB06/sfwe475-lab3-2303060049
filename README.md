# Task Board — React Core: UI as State

A small React and TypeScript task board built for the SFWE475 / CPRG201 Lab 4 activity. It demonstrates reusable components, props, local state, keyed lists, controlled inputs, lifting state to a shared parent, and `localStorage` persistence.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`. Run the configured linter with `npm run lint`.

## What it does

- Add tasks with a controlled input; blank titles are ignored.
- Toggle task completion from each task card.
- Filter the list to show all, done, or open tasks.
- Save tasks in this browser and restore them after a reload.
- Validate saved task data with the shared Zod schema before loading it.

There is no backend. Task data stays in the current browser's local storage.

## Personal lab notes

Add your own explanations and observations in `notes/react.md`. Answer the three self-check questions in `notes/reflection.md`; prompts are left there for you.
