import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks/taskSlice";
import themeReducer from "./Theme/themeSlice";

export const store = configureStore({
  reducer: {
    taskReducer,
    themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
