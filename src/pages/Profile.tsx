
import { useSelector } from 'react-redux'
import { TaskBoard } from './TaskBoard'
import type { RootState } from '../store';

export const Profile = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  return (
     <section className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Профиль</h2>
      <p className="text-gray-800">Вы вошли как: <strong>{email}</strong></p>
      <TaskBoard/>
    </section>
  )
}
