import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const saved = localStorage.getItem("tasks");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [value, setValue] = useState<string>("");

  const toggleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const AddTask = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now(), title: value, isDone: false }]);
    setValue("");
  };
  const DeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as typeof filter;
    setFilter(value);
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isDone;
    if (filter === "completed") return task.isDone;
    return true;
  });
  return (
    <div>
      <div>
        <label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && AddTask()}
            placeholder="Новая задача..."
            className="border px-3 py-2 rounded w-full"
          />
        </label>
        <button onClick={() => AddTask()}>Добавить Задачу</button>
      </div>
      <div>
        <label htmlFor="filter-select"></label>
        <select
          value={filter}
          name="filter"
          id="filter-select"
          onChange={handleFilterChange}
        >
          <option value="">-- Фильтр --</option>
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="completed">Завершённые</option>
        </select>
      </div>
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="bg-white p-4 rounded shadow flex items-center justify-between"
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => toggleDone(task.id)}
                className="w-4 h-4"
              />
              <span className={task.isDone ? "line-through text-gray-400" : ""}>
                {task.title}
              </span>
            </label>

            <TrashIcon
              className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => DeleteTask(task.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
