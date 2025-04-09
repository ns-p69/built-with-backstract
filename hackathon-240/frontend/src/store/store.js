import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with proper middleware setup
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
            thunk: true,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store); 