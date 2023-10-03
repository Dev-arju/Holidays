import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Register = () => {
  const { authData } = useSelector((state) => state.provider);

  if (Object.keys(authData).length > 0) {
    return <Navigate to="/provider" />;
  }

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen bg-neutral-50 shadow-inner overflow-hidden">
        <Outlet />
      </div>
    </>
  );
};

export default Register;
