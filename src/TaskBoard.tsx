import { useEffect, useState } from "react";
import { TaskSchema, type CreateTaskInput, type Task } from "./schemas";
import FilterBar from "./FilterBar";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import type { TaskFilter } from "./taskFilters";
import { simulateFetchTasks } from "./mockApi";

const STORAGE_KEY = "sfwe475-task-board-tasks";

const MIN_LOADING_MS = 400;
type LoadStatus = "loading" | "success" | "empty" | "error";

function loadSavedTasks(fallback: Task[]): Task[] {
  try {
    const savedTasks = window.localStorage.getItem(STORAGE_KEY);
    if (savedTasks === null) return fallback;

    const parsedTasks = TaskSchema.array().safeParse(JSON.parse(savedTasks));
    return parsedTasks.success ? parsedTasks.data : fallback;
  } catch {
    return fallback;
  }
}

function TaskBoard() {
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [retryCount, setRetryCount] = useState(0);
  const [mockMode] = useState(() => {
    const mode = new URLSearchParams(window.location.search).get("mock");
    return mode === "empty" || mode === "error" || mode === "fast" ? mode : null;
  });
  const doneCount = tasks.filter((task) => task.done).length;
  const openCount = tasks.length - doneCount;
  const isReady = status === "success" || status === "empty";

  useEffect(() => {
    let cancelled = false;
    let transitionTimer: ReturnType<typeof setTimeout> | undefined;
    const startedAt = Date.now();

    function showResult(data: Task[] | null) {
      if (cancelled) return;

      // Delay the UI transition, while allowing the fetch to finish normally.
      const remainingMs = Math.max(0, MIN_LOADING_MS - (Date.now() - startedAt));
      transitionTimer = setTimeout(() => {
        if (cancelled) return;

        if (data === null) {
          setStatus("error");
          return;
        }

        setTasks(data);
        setStatus(data.length === 0 ? "empty" : "success");
      }, remainingMs);
    }

    simulateFetchTasks({
      empty: mockMode === "empty",
      shouldFail: mockMode === "error" && retryCount === 0,
      delayMs: mockMode === "fast" ? 50 : 800,
    })
      .then((data) => showResult(mockMode === null ? loadSavedTasks(data) : data))
      .catch(() => showResult(null));

    return () => {
      cancelled = true;
      clearTimeout(transitionTimer);
    };
  }, [mockMode, retryCount]);

  useEffect(() => {
    if (!isReady || mockMode !== null) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Keep the list usable in memory if storage is blocked or full.
    }
  }, [tasks, isReady, mockMode]);

  function handleRetry() {
    setStatus("loading");
    setRetryCount((count) => count + 1);
  }

  function handleAddTask(input: CreateTaskInput) {
    setTasks((currentTasks) => {
      const nextId = currentTasks.reduce(
        (highestId, task) => Math.max(highestId, task.id),
        0,
      ) + 1;

      return [...currentTasks, {
        id: nextId,
        title: input.title,
        dueDate: input.dueDate || undefined,
        status: input.status,
        done: input.status === "done",
      }];
    });
    setStatus("success");
    setFilter("all");
  }

  function handleToggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done, status: task.done ? "open" : "done" }
          : task,
      ),
    );
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Lab 5</p>
        <h1>Task board</h1>
        <p>Add tasks, set a due date, and track your progress.</p>
      </header>

      <section className="task-board" aria-label="Task board">
        <div className="board-status" aria-live="polite" aria-atomic="true">
          {status === "loading" && <p className="empty-state">Loading tasks...</p>}
          {status === "error" && (
            <p className="error-state">We couldn't load your tasks. Please try again.</p>
          )}
          {status === "empty" && (
            <p className="empty-state">No tasks yet. Add your first one below.</p>
          )}
          {status === "success" && (
            <p className="visually-hidden">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in your list.
            </p>
          )}
        </div>

        {status === "error" && (
          <button className="retry-button" type="button" onClick={handleRetry}>
            Try again
          </button>
        )}

        {isReady && (
          <>
            <NewTaskForm onAddTask={handleAddTask} />

            <div className="board-toolbar">
              <div>
                <h2>Your tasks</h2>
                <p className="task-count">{openCount} open · {doneCount} done</p>
              </div>
              <FilterBar filter={filter} onFilterChange={setFilter} />
            </div>

            {status === "success" && (
              <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />
            )}

            <footer className="board-footer">
              <span className="save-indicator" aria-hidden="true" />
              <p>
                {mockMode !== null
                  ? "Practice mode. Changes last until you reload this page."
                  : "Tasks are saved locally when browser storage is available."}
              </p>
            </footer>
          </>
        )}
      </section>
    </main>
  );
}

export default TaskBoard;
