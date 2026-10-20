import { useState, type FormEvent } from "react";

type NewTaskInputProps = {
  onAddTask: (title: string) => void;
};

function NewTaskInput({ onAddTask }: NewTaskInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = text.trim();
    if (title === "") return;

    onAddTask(title);
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
