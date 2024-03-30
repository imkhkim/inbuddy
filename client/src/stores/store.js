import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // localStorage를 사용할 경우

import counterReducer from '@/stores/counter';
import authReducer from '@/stores/authStore';
import testReducer from '@/stores/test';
import journeyReducer from '@/stores/journeySlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    test: testReducer,
    journey: journeyReducer,
});

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
