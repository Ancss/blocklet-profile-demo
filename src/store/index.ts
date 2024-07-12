import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    profile: profileReducer,
  },
});
