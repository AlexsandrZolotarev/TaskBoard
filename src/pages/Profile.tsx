
import { useAuth } from '../context/AuthContext'
import { TaskBoard } from './TaskBoard'

export const Profile = () => {
 const { userEmail } = useAuth()
  return (
     <section className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Профиль</h2>
      <p className="text-gray-800">Вы вошли как: <strong>{userEmail}</strong></p>
      <TaskBoard/>
    </section>
  )
}
