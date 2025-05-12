import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export type User = {
  email: string
  password: string
  tasks: {
    id: number
    title: string
    isDone: boolean
  }[]
}

type UsersState = User[];

const initialState:UsersState = JSON.parse(localStorage.getItem('users')|| '[]');

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const existing = state.find(u => u.email === action.payload.email)
      if (!existing) {
        state.push({ ...action.payload, tasks: [] })
        localStorage.setItem("users", JSON.stringify(state))
      }
    },
    saveTasks: (state, action: PayloadAction<{ email: string; tasks: User["tasks"] }>) => {
      const user = state.find(u => u.email === action.payload.email)
      if (user) {
        user.tasks = action.payload.tasks
        localStorage.setItem("users", JSON.stringify(state))
      }
    },
  },
})

export const {register,saveTasks} = usersSlice.actions;
export default usersSlice.reducer;