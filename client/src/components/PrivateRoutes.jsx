import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { authData } = useSelector((state) => state.user);

  console.log(authData);

  return Object.keys(authData).length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoutes;
