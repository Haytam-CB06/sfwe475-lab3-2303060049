# Task Board - Lab 5

A React and TypeScript task board for SFWE475 / CPRG201. This lab adds a mock API, loading and error handling, a validated task form, and accessibility improvements.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`. Run the configured linter with `npm run lint`.

## What it does

- Load tasks from a mock API with an 800 ms delay.
- Show separate loading, success, empty, and error states, with a retry button after errors.
- Keep the loading message visible for at least 400 ms, including fast responses.
- Add tasks with a title, an optional due date, and an open/doing/done status.
- Validate submissions with Zod and display errors beneath the relevant field.
- Use visible labels, linked error messages, a live status region, and visible keyboard focus.
- Toggle task completion from each task card.
- Filter the list to show all, done, or open tasks.
- Save tasks in this browser and restore them after a reload.
- Validate saved task data with the shared Zod schema before loading it.

There is no backend. In the normal view, saved browser data is restored after the mock request succeeds. If there is no valid saved list, the mock API supplies two sample tasks.

## Try each state

With the dev server running, open these paths on the local address Vite prints:

| Path | Expected behavior |
| --- | --- |
| `/` | Loading, then saved tasks or the two sample tasks. |
| `/?mock=empty` | Loading, then the empty message and a working task form. |
| `/?mock=error` | Loading, then an error. Select **Try again** to load the sample tasks. |
| `/?mock=fast` | A 50 ms mock response, with loading still visible for at least 400 ms. |

Practice modes ignore saved tasks and do not overwrite them. Reloading a practice view resets its tasks. To test an empty saved list in the normal view, set `sfwe475-task-board-tasks` to `[]` in the browser's local storage and reload.

The submit button is disabled while the title is blank. Leaving a blank title field shows its inline error; Zod also checks every form submission. After a valid submission, the fields reset, focus returns to the title field, and the new task appears even if a filter was active.

## Personal lab notes

Complete the marked placeholders in `notes/dataux.md` and the Lab 5 section of `notes/reflection.md`. Earlier lab notes and answers have been kept.

Name: Haytam CHARAFI

Student number: 2303060049


My short description of the changes:

> I updated the task board to handle loading, empty, and error states using a mock API, with a retry button for failed requests. I added a form with Zod validation, an optional due date, and a status selector. I also improved accessibility with visible labels, linked error messages, live status announcements, and clearer keyboard focus.

## Submission checklist

Fill in the written answers before ticking the last item. Copy this checklist into your pull request description.

- [ ] All four statuses (loading, success, empty, error) show distinct, correct UI.
- [ ] NewTaskForm validates with Zod and shows errors next to the right field.
- [ ] Every form field has a real label.
- [ ] The form is fully usable with only the keyboard.
- [ ] `notes/dataux.md` answers all written questions.

The handout asks for at least three meaningful commits and a pull request into `main`. Leave the pull request unmerged; its link is the submission.
