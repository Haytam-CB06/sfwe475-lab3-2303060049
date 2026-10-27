# Lab self-check

Answer each question in two or three sentences, using your own words.

## Strand 3: shared filter state

Why can't `FilterBar` and `TaskList` share filter state directly without lifting it to a shared parent?

> Your answer: FilterBar and TaskList cannot directly share the filter state because they are separate components, and React state is local to the component that owns it

## Strand 2: list keys

What specifically could go wrong if `TaskList` used each array item's index as its `TaskCard` key instead of `task.id`?

> Your answer: If TaskList used the array index as a key instead of task.id, React could confuse tasks when the list is filtered or updated.

## Strand 3: props and requests

In the sentence "props flow down, requests flow up," give one example of each direction from your `TaskBoard` app.

> Your answer: In my TaskBoard app, props flow down when the parent component passes the selected filter to TaskList so it knows which tasks to display

---

# Lab 5 self-check

Answer each question in two or three sentences, using your own words.

## 1. Empty and error states

Why is an empty list not the same thing as an error, and what should change in the UI between the two?

> An empty list means the application successfully loaded the data and found no tasks. An error means the application could not complete the request, so it cannot reliably tell whether tasks exist

## 2. Field-level validation

Your form validates with safeParse on submit. Why does the error get stored in errors.title specifically, instead of one single error message for the whole form?

> Zod associates each validation issue with the field that caused it. Calling flatten().fieldErrors groups those issues by field name, which puts title-related messages in errors.title.

## 3. Live status messages

What does aria-live actually do, and why does a loading message need it even though a sighted user can already see the screen change?

> aria-live lets assistive technology announce changes inside a region without requiring the user to move focus there. With the polite setting, the announcement can wait until the screen reader finishes its current speech.
