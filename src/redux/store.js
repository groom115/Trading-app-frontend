import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

// Configure Store
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;
