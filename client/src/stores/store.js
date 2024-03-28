import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/stores/counter';
import authReducer from '@/stores/auth';
import testReducer from '@/stores/test';

const store = configureStore({ reducer: { counter: counterReducer, auth: authReducer, test: testReducer } });

export default store;
