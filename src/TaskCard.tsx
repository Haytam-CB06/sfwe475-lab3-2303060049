import type { Task } from "./schemas";
import TaskCheckbox from "./TaskCheckbox";
type TaskCardProps = Pick<Task, "title" | "done"> & {
  dueDate?: string;
  onToggle: () => void;
};

function TaskCard({ title, done, dueDate, onToggle }: TaskCardProps) {
  return (
    <article className={done ? "task-card is-done" : "task-card"}>
      <TaskCheckbox
        done={done}
        label={`Mark ${title} as ${done ? "open" : "done"}`}
        onToggle={onToggle}
      />
      <div className="task-copy">
        <h3>{title}</h3>
        <div className="task-meta">
          <span className={done ? "status-badge is-done" : "status-badge"}>
            {done ? "Done" : "Open"}
          </span>
          {dueDate && <time dateTime={dueDate}>Due: {dueDate}</time>}
        </div>
      </div>
    </article>
  );
}

export default TaskCard;

