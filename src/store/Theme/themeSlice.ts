import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

type themeStore = {
  darkMode: boolean;
};

const initialTheme: themeStore = {
  darkMode: true,
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: initialTheme,
  reducers: {
    setMode: (state: themeStore, action: PayloadAction<themeStore>) => {
      state.darkMode = action.payload.darkMode;
    },
  },
});

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
