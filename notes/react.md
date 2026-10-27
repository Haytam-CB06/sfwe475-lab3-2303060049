# React lab notes

Use these prompts to write your own explanations. Keep the answers in your own words.

## Strand 1: props and state

In two or three sentences, explain the difference between `title` (a prop) and `done` (state). Why can `TaskCard` change one but not the other?

==>> title is a prop from the parent component TaskCard, the component can display it but not change it directly, but when done changes, react re render the changes automatically.

## Strand 2: stable list keys

==>> The index represents the item's position not the item we want to change, but task.id represents the task no matter which position he has in the list.

## Strand 2: controlled input

Describe what happened when you temporarily removed the input's `onChange` handler and tried to type.

==>> When I removed the onChange handler, the input became read-only, meaning I couldn't modify its value by typing.

## Strand 3: state round trip

In two or three sentences, explain which component owns the task state, which component requested the change, and how the request reached the state owner.

> Your explanation: TaskCard manages the task state using useState, while TaskCheckbox requests a change when the user interacts with the checkbox. This request is passed through the onToggle callback function, which allows TaskCard to update its state using setDone. React then re-renders the component to reflect the updated state.
