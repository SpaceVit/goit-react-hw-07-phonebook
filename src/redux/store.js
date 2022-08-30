import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { contactsApi } from './contactsServerSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleWare => [
    ...getDefaultMiddleWare(),
    contactsApi.middleware,
  ],
});

setupListeners(store.dispatch);
