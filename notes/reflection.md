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
