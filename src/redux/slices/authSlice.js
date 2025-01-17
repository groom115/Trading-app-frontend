import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
    isAuthenticated: false,
    token: null,
};

// Slice Definition
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        signup: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
        },
    },
});

// Export Actions and Reducer
// export const { login, signup, logout } = authSlice.actions;
export default authSlice;
