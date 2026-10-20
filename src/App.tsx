import TaskCard from "./TaskCard";

function App() {
  return (
    <div>
      <TaskCard
        title="Finish Assignment"
        done={false}
        dueDate="2026-10-25"
      />

      <TaskCard
        title="Study React"
        done={true}
      />
    </div>
  );
}

export default App;