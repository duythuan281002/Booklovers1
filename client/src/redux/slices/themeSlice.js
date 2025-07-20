import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isTheme:
      JSON.parse(localStorage.getItem("theme")) === "dark" ? true : false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isTheme = !state.isTheme;
      localStorage.setItem(
        "theme",
        JSON.stringify(state.isTheme ? "dark" : "light")
      );
    },
    setTheme: (state, action) => {
      state.isTheme = action.payload === "dark";
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
