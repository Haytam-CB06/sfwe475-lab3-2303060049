import type { TaskFilter } from "./taskFilters";

type FilterBarProps = {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
};

const filters: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "All tasks" },
  { value: "done", label: "Done tasks" },
  { value: "open", label: "Open tasks" },
];

function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks">
      {filters.map((option) => (
        <button
          className={filter === option.value ? "filter-button is-active" : "filter-button"}
          key={option.value}
          type="button"
          aria-pressed={filter === option.value}
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
