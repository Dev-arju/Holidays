import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : {},
  apiError: "",
};

const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.authData = action.payload;
      state.apiError = "";
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    setApiError: (state, action) => {
      state.authData = {};
      state.apiError = action.payload;
    },
    dropCredential: (state) => {
      state.authData = {};
      state.apiError = "";
      localStorage.removeItem("admin");
    },
  },
});

export const { setCredential, setApiError, dropCredential } =
  adminSlice.actions;
export default adminSlice.reducer;
