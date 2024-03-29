import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/stores/counter';
import authReducer from '@/stores/authStore';
import testReducer from '@/stores/test';
import journeyReducer from '@/stores/journeySlice';

const store = configureStore({
    reducer: { counter: counterReducer, auth: authReducer, test: testReducer, journey: journeyReducer },
});
const store = configureStore({
    reducer: { counter: counterReducer, auth: authReducer, test: testReducer },
});

export default store;
