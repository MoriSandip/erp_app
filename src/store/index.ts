import { configureStore } from '@reduxjs/toolkit';
import smartHomeReducer from './smartHomeSlice';
import erpReducer from './erpSlice';
import authReducer from './auth/slice';

 

export const store = configureStore({
    reducer: {
        smartHome: smartHomeReducer,
        erp: erpReducer,
        auth: authReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 