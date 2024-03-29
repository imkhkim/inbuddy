import { configureStore } from '@reduxjs/toolkit';
import journeyReducer from './journeySlice';
export const store = configureStore({
    reducer: {
        journey: journeyReducer,
    },
})