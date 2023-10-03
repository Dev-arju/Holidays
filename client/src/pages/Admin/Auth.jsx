import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuth, setApiError } from "../../redux/slices/adminSlice";
import { GiWorld } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
// import { adminInstance } from "../../utils/axios";

const authRegEx = /^\d{6}$/;
const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const Auth = () => {
  const [authId, setAuthId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!authRegEx.test(authId)) toast.error("enter six digit pin");
    if (!passwordRegEx.test(password))
      return toast.error("password does not match the crieteria");
    if (authRegEx.test(authId) && passwordRegEx.test(password)) {
      // adminInstance
      // .post(
      //   "/admin/auth",
      //   { authId, password },
      //   {
      //     withCredentials: true,
      //   }
      // )
      // .then((res) => {
      //   if (res.status !== 201) throw new Error(res.data);
      //   dispatch(setIsAuth(res.data));
      //   navigate("/admin", { replace: true });
      // })
      // .catch((err) => {
      //   dispatch(setApiError(err.response.data.message || err.message));
      //   toast.error(err.response.data.message || err.message);
      // });
    }
  };
  return (
    <>
      <ToastContainer />
      <main className="w-full h-screen flex justify-center items-center bg-slate-100">
        <div className="hidden sm:block relative shadow-md w-64 h-96">
          <img
            src="/src/assets/kerala-responsible-tourism.jpg"
            alt=""
            className="w-fit h-fit overflow-hidden"
          />
          <div className="absolute top-1 left-1 font-title text-sm rounded z-10">
            <GiWorld className="inline-block" /> heaven holidays
          </div>
        </div>
        <div className="flex flex-col justify-center w-64 h-96  shadow-md p-4">
          <h1 className="justify-self-start text-xl mb-8 underline sm:hidden font-title text-center">
            Heaven Holidays
          </h1>
          <h2 className="text-center font-tabs text-gray-500 mb-2 py-2">
            Adminstrator Login
          </h2>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col text-xs font-body"
          >
            <label htmlFor="authId">Auth Id</label>
            <input
              type="text"
              id="authId"
              value={authId}
              onChange={(e) => setAuthId(e.target.value)}
              className="focus:outline-none focus:border-2 rounded border mb-2 py-1 px-2 border-gray-600 text-sm"
            />
            <label htmlFor="password">Enter password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none focus:border-2 rounded border mb-2 py-1 px-2 border-gray-600 text-sm"
            />
            <button
              type="submit"
              className="py-2 my-2 bg-black text-white text-base sm:hover:scale-y-105 hover:shadow-sm rounded-sm"
            >
              log In
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Auth;
