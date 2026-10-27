import { useRef, useState, type FormEvent } from "react";
import { CreateTaskSchema, type CreateTaskInput } from "./schemas";

type NewTaskFormProps = {
  onAddTask: (input: CreateTaskInput) => void;
};

function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("open");
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const titleRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = CreateTaskSchema.safeParse({ title, dueDate, status });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);

      if (fieldErrors.title) titleRef.current?.focus();
      else if (fieldErrors.dueDate) dueDateRef.current?.focus();
      else if (fieldErrors.status) statusRef.current?.focus();
      return;
    }

    setErrors({});
    onAddTask(result.data);
    setTitle("");
    setDueDate("");
    setStatus("open");
    titleRef.current?.focus();
  }

  return (
    <form className="new-task-form" aria-label="Add a task" noValidate onSubmit={handleSubmit}>
      <div className="form-field title-field">
        <label htmlFor="title">Task title</label>
        <input
          ref={titleRef}
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={() => {
            if (title.trim() === "") setErrors((current) => ({ ...current, title: ["Title is required"] }));
          }}
          autoComplete="off"
          required
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        <p className="field-error title-error" id="title-error">{errors.title?.[0]}</p>
      </div>

      <div className="form-field">
        <label htmlFor="due-date">Due date (optional)</label>
        <input
          ref={dueDateRef}
          id="due-date"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          aria-invalid={!!errors.dueDate}
          aria-describedby={errors.dueDate ? "due-date-error" : undefined}
        />
        {errors.dueDate && <p className="field-error" id="due-date-error">{errors.dueDate[0]}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="task-status">Status</label>
        <select
          ref={statusRef}
          id="task-status"
          name="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-invalid={!!errors.status}
          aria-describedby={errors.status ? "status-error" : undefined}
        >
          <option value="open">Open</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        {errors.status && <p className="field-error" id="status-error">{errors.status[0]}</p>}
      </div>

      <button type="submit" disabled={title.trim() === ""}>Add task</button>
    </form>
  );
}

export default NewTaskForm;
