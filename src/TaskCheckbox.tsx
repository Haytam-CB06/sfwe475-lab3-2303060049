type TaskCheckboxProps = {
  done: boolean;
  label: string;
  onToggle: () => void;
};

function TaskCheckbox({ done, label, onToggle }: TaskCheckboxProps) {
  return (
    <input
      className="task-checkbox"
      type="checkbox"
      checked={done}
      aria-label={label}
      onChange={onToggle}
    />
  );
}

export default TaskCheckbox;
