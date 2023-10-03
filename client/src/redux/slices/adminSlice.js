import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: localStorage.getItem("adminActive")
    ? !!localStorage.getItem("adminActive")
    : false,
  apiError: "",
};

const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.apiError = "";
      localStorage.setItem(
        "adminActive",
        JSON.stringify(action.payload.isAuth)
      );
    },
    setApiError: (state, action) => {
      state.isAuth = false;
      state.apiError = action.payload;
    },
    dropIsAuth: (state) => {
      state.isAuth = false;
      state.apiError = "";
      localStorage.removeItem("adminActive");
    },
  },
});

export const { setIsAuth, setApiError, dropIsAuth } = adminSlice.actions;
export default adminSlice.reducer;
