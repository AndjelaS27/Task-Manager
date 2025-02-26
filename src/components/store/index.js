import { configureStore } from '@reduxjs/toolkit';
import { api } from "../rtk";
import taskReducer from "./taskSlice"

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


