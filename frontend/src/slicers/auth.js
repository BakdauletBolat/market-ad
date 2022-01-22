import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: undefined
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        login: (state, action) => {
            localStorage.setItem('userToken',action.payload.access);
            state.user = action.payload.user
        },
        logout: (state) => {
            localStorage.removeItem('userToken');
            state.user = undefined
        }
    }
});

export const { setUser,login,logout } = userSlice.actions;

export default userSlice.reducer