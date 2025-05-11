import { useState } from "react";

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: "Изучить React", isDone: false },
    { id: 2, title: "Сделать TaskBoard", isDone: true },
  ]);
  const [value, setValue] = useState<string>("");

  const toggleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };
  const AddTask = () => {
    const trimmed = value.trim();
    if(!trimmed) return;
    setTasks([...tasks, { id: Date.now(), title: value, isDone: false }]);
    setValue("");
  };
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
      <ul className="space-y-2">
        {tasks.map((task) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};
