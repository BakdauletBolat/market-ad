import { createSlice } from '@reduxjs/toolkit';


export const notificationSlice = createSlice({
    name: 'advertising',
    initialState: {
        success: [],
        errors: []
    },
    reducers: {
        setSuccessMessages: (state, action) => {
            state.success = action.payload
        },
        setErrorMessages: (state, action) => {
            state.errors = state.payload
        }
    }
});

export const { setAdvertising } = notificationSlice.actions

export default notificationSlice.reducer