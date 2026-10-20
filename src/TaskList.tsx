import type { Task } from "./schemas";
import TaskCard from "./TaskCard";

const tasks: Task[] = [
  { id: 1, title: "Read Chapter 3", done: false, dueDate: "2026-10-25" },
  { id: 2, title: "Build TaskCard", done: true },
  { id: 3, title: "Start TaskList", done: false },
];

function TaskList() {
  return (
    <div className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          done={task.done}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
}

export default TaskList;
