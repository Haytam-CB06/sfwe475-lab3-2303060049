import { useState, type FormEvent } from "react";

function NewTaskInput() {
  const [text, setText] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim() === "") return;

    console.log(text.trim());
    setText("");
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task-title">
        New task title
      </label>
      <input
        id="new-task-title"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a task..."
        autoComplete="off"
      />
      <button type="submit" disabled={text.trim() === ""}>
        Add task
      </button>
    </form>
  );
}

export default NewTaskInput;
