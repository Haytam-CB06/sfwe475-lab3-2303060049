import type { Task } from "./schemas";
import TaskCard from "./TaskCard";
import type { TaskFilter } from "./taskFilters";

type TaskListProps = {
  tasks: Task[];
  filter: TaskFilter;
  onToggleTask: (id: number) => void;
};

function TaskList({ tasks, filter, onToggleTask }: TaskListProps) {
  const visibleTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "open") return !task.done;
    return true;
  });

  if (visibleTasks.length === 0) {
    const message = tasks.length === 0
      ? "No tasks yet. Add your first task above."
      : `No ${filter} tasks right now.`;
    return <p className="empty-state" role="status">{message}</p>;
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {visibleTasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            title={task.title}
            done={task.done}
            dueDate={task.dueDate}
            onToggle={() => onToggleTask(task.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
