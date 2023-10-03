import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: localStorage.getItem("provider")
    ? JSON.parse(localStorage.getItem("provider"))
    : {},
  error: "",
};

const providerSlice = createSlice({
  name: "providerAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.authData = action.payload;
      state.error = "";
      localStorage.setItem("provider", JSON.stringify(action.payload));
    },
    setError: (state, action) => {
      state.authData = {};
      state.error = action.payload;
    },
    dropCredentials: (state) => {
      state.authData = {};
      state.error = "";
      localStorage.removeItem("provider");
    },
  },
});

export const { setCredentials, setError, dropCredentials } =
  providerSlice.actions;
export default providerSlice.reducer;
