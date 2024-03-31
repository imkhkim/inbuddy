import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // localStorage를 사용할 경우

import counterReducer from '@/stores/counterStoreTemplate';
import authReducer from '@/stores/authStore';
import testReducer from '@/stores/testStore';
import journeyReducer from '@/stores/journeySlice';
import itemReducer from '@/stores/itemStore';
import journeyAllReducer from '@/stores/journeyAllStore';

const rootReducer = combineReducers({
    counter: counterReducer,
    test: testReducer,
    auth: authReducer,
    item: itemReducer,
    journey: journeyReducer,
    journeyAll: journeyAllReducer,
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
