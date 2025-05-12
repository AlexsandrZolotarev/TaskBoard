import { useSelector } from "react-redux";
import { TaskBoard } from "./TaskBoard";
import type { RootState } from "../store";
import { useEffect, useState } from "react";
import { ConfirmDeleteModal } from "../UI/ConfirmDeleteModal";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const Profile = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const user = useSelector((state: RootState) =>
    state.users.find((user) => user.email === email)
  );
  const [tasks, setTasks] = useState<TaskType[] | []>(user?.tasks || []);
  const [showModal, setShowModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const [isHoveringLeft, SetIsHoveringLeft] = useState(false);
    const [isHoveringRight,  SetIsHoveringRight] = useState(false);
  return (
    <section className="bg-white p-6 rounded  shadow-md max-w-md mx-auto">
      <div
        className={`drop-zone left ${isHoveringLeft ? "hover" : ""}`}
        onDrop={() => setShowModal(true)}
        onDragEnter={() => SetIsHoveringLeft(true)}
        onDragLeave={() => SetIsHoveringLeft(false)}
        onDragOver={(e) => e.preventDefault()}
      />
      <div>
        <h2 className="text-xl font-bold mb-4">Профиль</h2>
        <p className="text-gray-800">
          Вы вошли как: <strong>{email}</strong>
        </p>
        <TaskBoard
          tasks={tasks}
          setTasks={setTasks}
          email={email}
          user={user}
          setPendingDeleteId={setPendingDeleteId}
        />
      </div>

      <div
        className={`drop-zone right ${isHoveringRight ? "hover" : ""}`}
        onDrop={() => setShowModal(true)}
        onDragEnter={() => SetIsHoveringRight(true)}
        onDragLeave={() => SetIsHoveringRight(false)}
        onDragOver={(e) => e.preventDefault()}
      />

      {showModal && (
        <ConfirmDeleteModal
          isOpen={showModal}
          taskTitle={tasks.find((t) => t.id === pendingDeleteId)?.title || ""}
          onCancel={() => {
            setShowModal(false);
            setPendingDeleteId(null);
          }}
          onConfirm={() => {
            setTasks(tasks.filter((t) => t.id !== pendingDeleteId));
            setShowModal(false);
            setPendingDeleteId(null);
          }}
        />
      )}
    </section>
  );
};
