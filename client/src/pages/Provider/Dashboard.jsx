import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { authData } = useSelector((state) => state.provider);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div>{authData.name}</div>
      <div>{authData.email}</div>
    </>
  );
};

export default Dashboard;
