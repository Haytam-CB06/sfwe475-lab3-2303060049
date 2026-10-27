import { useEffect, useState } from "react";
import { TaskSchema, type Task } from "./schemas";
import FilterBar from "./FilterBar";
import NewTaskInput from "./NewTaskInput";
import TaskList from "./TaskList";
import type { TaskFilter } from "./taskFilters";

const STORAGE_KEY = "sfwe475-task-board-tasks";

const initialTasks: Task[] = [
  { id: 1, title: "Read Chapter 3", done: false, dueDate: "2026-10-25" },
  { id: 2, title: "Build TaskCard", done: true },
];

function loadTasks(): Task[] {
  try {
    const savedTasks = window.localStorage.getItem(STORAGE_KEY);
    if (savedTasks === null) return initialTasks;

    const parsedTasks = TaskSchema.array().safeParse(JSON.parse(savedTasks));
    return parsedTasks.success ? parsedTasks.data : initialTasks;
  } catch {
    return initialTasks;
  }
}

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const doneCount = tasks.filter((task) => task.done).length;
  const openCount = tasks.length - doneCount;

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The board remains usable in memory if browser storage is unavailable.
    }
  }, [tasks]);

  function handleAddTask(title: string) {
    const cleanTitle = title.trim();
    if (cleanTitle === "") return;

    setTasks((currentTasks) => {
      const nextId = currentTasks.reduce(
        (highestId, task) => Math.max(highestId, task.id),
        0,
      ) + 1;

      return [...currentTasks, { id: nextId, title: cleanTitle, done: false }];
    });
  }

  function handleToggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">React Core · UI as State</p>
        <h1>Make room for what matters.</h1>
        <p>One clear list for the next thing you want to get done.</p>
      </header>

      <section className="task-board" aria-label="Task board">
        <NewTaskInput onAddTask={handleAddTask} />

        <div className="board-toolbar">
          <div>
            <h2>Your tasks</h2>
            <p className="task-count">
              {openCount} open · {doneCount} done
            </p>
          </div>
          <FilterBar filter={filter} onFilterChange={setFilter} />
        </div>

        <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />

        <footer className="board-footer">
          <span className="save-indicator" aria-hidden="true" />
          <p>Saved in this browser. Your list will be here when you return.</p>
        </footer>
      </section>
    </main>
  );
}

export default TaskBoard;
