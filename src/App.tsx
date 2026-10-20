import "./App.css";
import NewTaskInput from "./NewTaskInput";
import TaskList from "./TaskList";

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">React Core · UI as State</p>
        <h1>My tasks</h1>
        <p>Keep your next steps in one place.</p>
      </header>

      <section className="task-board" aria-label="Task board">
        <NewTaskInput />
        <TaskList />
      </section>
    </main>
  );
}

export default App;
