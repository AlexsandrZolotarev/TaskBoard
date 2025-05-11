import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type AuthState ={
    email: string | null;
}

const initialState :AuthState = {
    email:localStorage.getItem('currentUserEmail') || null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action : PayloadAction<string>) => {
            state.email = action.payload
            localStorage.setItem('currentUserEmail',action.payload);
        },
        logout:(state) => {
            state.email = null
            localStorage.removeItem('currentUserEmail');
        },
    }
});

export const { login, logout } = authSlice.actions
export default authSlice.reducer