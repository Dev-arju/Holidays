import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/userSlice";
import providerReducer from "../redux/slices/providerSlice";
import adminReducer from "../redux/slices/adminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    provider: providerReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
