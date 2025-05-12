import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { TaskType } from "./Profile";

export const StatsPanel = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const user = useSelector((state: RootState) =>
    state.users.find((user) => user.email === email)
  );

  const tasks: TaskType[] | [] = user?.tasks || [];
  const done = tasks.filter((t) => t.isDone).length;
  const left = tasks.length - done;
  return (
    <div className="bg-white shadow rounded p-4 text-center space-y-2">
      <h2 className="text-lg font-semibold">📊 Моя продуктивность</h2>
      <div>Всего задач: {tasks.length}</div>
      <div>✅ Завершено: {done}</div>
      <div>🕒 Осталось: {left}</div>
    </div>
  );
};
