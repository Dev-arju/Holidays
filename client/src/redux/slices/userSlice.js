import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  error: "",
};

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.authData = action.payload;
      state.error = "";
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setError: (state, action) => {
      state.authData = {};
      state.error = action.payload;
    },
    dropCredential: (state) => {
      state.authData = {};
      state.error = "";
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, setError, dropCredential } = userSlice.actions;
export default userSlice.reducer;
