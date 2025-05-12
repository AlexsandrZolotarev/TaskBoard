import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type AuthState ={
    email: string | null;
    username: string | null;
}

const initialState :AuthState = {
    email:localStorage.getItem('currentUserEmail') || null,
    username:localStorage.getItem('currentUserName') || null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action: PayloadAction<{ email: string; username: string }>) => {
            state.email = action.payload.email;
            state.username = action.payload.username;
            localStorage.setItem('currentUserEmail',action.payload.email);
            localStorage.setItem('currentUserName',action.payload.username);
        },
        logout:(state) => {
            state.email = null
            localStorage.removeItem('currentUserEmail');
            localStorage.removeItem('currentUserName');
        },
    }
});

export const { login, logout } = authSlice.actions
export default authSlice.reducer