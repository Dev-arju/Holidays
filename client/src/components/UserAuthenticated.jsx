import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserAuthenticated = () => {
  const { authData } = useSelector((state) => state.user);

  return Object.keys(authData).length > 0 ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default UserAuthenticated;
