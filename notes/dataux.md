# Lab 5 - Data, forms, and accessibility

Replace the placeholders with your own explanations and observations.

## Strand 1: loading prediction

With the default 800 ms delay, what do you predict will appear during the first 800 milliseconds?

> I expect to see “Loading tasks...” while the mock API request is still pending. Since the status starts as loading, the task list and form should only appear after the request finishes and the state updates.

After running the app, did the result match your prediction?

> The loading message appeared first, then the form and task list became visible after roughly 800 milliseconds.This matched the expected behavior because the component waits for the mock request to finish before showing the tasks.

## Strand 1: empty and error states

Open `/?mock=empty` and `/?mock=error`. What appeared in each case? Why do empty and error need separate states?

> The empty view displayed “No tasks yet. Add your first one below,” while the error view displayed a failure message and a retry button. An empty response means the request worked but returned no tasks.

## Strand 1: retry

In `/?mock=error`, select Try again. Describe the transition and the result.

> Selecting “Try again” replaced the error message with the loading message. Once the new request succeeded, the two sample tasks appeared. This allowed the board to recover without refreshing the entire page.

## Strand 1 challenge: loading flicker

Open `/?mock=fast`. Why might a real app keep a loading message visible for at least 400 ms, even when the request finishes in 50 ms? What is the tradeoff?

> A loading message that appears and disappears almost immediately can look like the page is flickering. Keeping it visible for at least 400 milliseconds makes the transition less abrupt.

## Strand 2: validation

Leave the title blank and move focus to the next field. Then enter a valid title, choose a due date and status, and submit. Describe where the error appeared and what happened after a valid submission.

> Leaving the title blank and moving to another field displayed “Title is required” directly beneath the title input. A valid submission added the task with its selected due date and status.

## Strand 2 challenge: disabled submit button

Why does disabling the submit button for an empty title not replace the Zod safeParse check in handleSubmit?

> Disabling the button only prevents submission through that particular control. A submission can still be triggered programmatically,and the button does not check whether the other field values are valid.

## Strand 3: keyboard-only check

Use only Tab, Shift+Tab, typing, and Enter to reach the title field and submit a task. Record anything that did not work, or confirm that it worked. Also check that you can see which control has focus.

> The form controls could be reached using Tab,and Shift+Tab moved focus backward correctly. After entering a title, the submit button could be reached and activated with Enter.

## Strand 3: descriptive controls

Compare the filter button labels with the earlier version. Which wording changed, and why is it clearer on its own?

> The filter labels changed from “All,” “Done,” and “Open” to “All tasks,” “Done tasks,” and “Open tasks.” The updated wording makes each button’s purpose clearer when read on its own.


## Strand 3 challenge: accessibility audit

Run Lighthouse Accessibility or axe DevTools and record your own results.

- Tool used: axe-core 4.10.3
- Initial score or violation count: One failing color-contrast rule affecting six elements.
- Additional issue found: Some text, including completed task titles and filter labels, had insufficient contrast against its background.
- Change made: Darkened the affected text colors in src/App.css to improve contrast.
- Result after the change: Zero detected WCAG A/AA violations across the five tested views: success, empty, validation error, error, and mobile.

> [WRITE WHAT YOU LEARNED FROM THE AUDIT HERE]
