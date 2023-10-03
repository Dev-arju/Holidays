import React, { useState, useEffect } from "react";
import { GiWorld } from "react-icons/gi";
import { Slide, ToastContainer, toast } from "react-toastify";
import { postRequest } from "../../utils/axios";
import { setCredentials, setError } from "../../redux/slices/providerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Link, useLocation } from "react-router-dom";

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/;

const ProviderAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authData } = useSelector((state) => state.provider);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);

  const registration = queryParam.get("registration");
  const updated = queryParam.get("password");

  useEffect(() => {
    if (registration === "success") {
      toast.success("Welcome to Heaven Holidays, Login for bussiness with us");
    }
    if (updated === "reset") {
      toast.success("Password updated");
    }
  }, [registration, updated]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegEx.test(email)) toast.error("Invalid email address");
    if (!passwordRegEx.test(password))
      toast.error(
        "password should be 8 characters and contains letters, numbers and special characters"
      );
    if (emailRegEx.test(email) && passwordRegEx.test(password)) {
      const response = await postRequest("/provider/auth", { email, password });

      if (response.data) {
        dispatch(setCredentials(response.data));
        navigate("/provider", { replace: true });
      }

      if (response.error) {
        dispatch(setError(response.error.message || response.message));
        toast.error(response.error.message || response.message);
      }
    }
  };
  if (Object.keys(authData).length > 0) {
    return <Navigate to="/provider" replace />;
  }
  return (
    <>
      <ToastContainer limit={2} transition={Slide} position="top-center" />
      <main className="w-full h-screen flex justify-center divide-x-2 items-center bg-slate-100">
        <div className="hidden sm:block overflow-hidden rounded-lg shadow-md w-64 h-96">
          <img
            src="/src/assets/hill-stations-kerala-tourism.jpg"
            alt="hill-stations-kerala-tourism.jpg"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-sky-200 w-64 h-96 rounded-lg shadow-md p-4">
          <div className="font-title text-2xl flex justify-center items-center mb-2">
            <GiWorld /> heaven holidays
          </div>
          <h2 className="text-center font-tabs text-gray-500  py-2">
            Provider Login
          </h2>
          <form
            action=""
            onSubmit={handleFormSubmit}
            className="flex flex-col text-xs font-body"
          >
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none focus:border rounded border mb-2 p-2 border-gray-600"
            />
            <label htmlFor="password">Enter password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none focus:border rounded border mb-2 p-2 border-gray-600"
            />
            <button
              className="transition ease-in-out duration-500 py-1 mt-1 text-black border-2 border-black text-base rounded-md hover:text-white hover:bg-black"
              type="submit"
            >
              log In
            </button>
          </form>
          <p className="text-center font-body text-xs my-2">
            forget password ?{" "}
            <Link
              to="/provider/reset"
              className="transition-all duration-300 hover:text-primary hover:scale-105"
            >
              click here
            </Link>
          </p>
          <hr className="border border-secondary my-2 shadow-2xl" />
          <p className="font-body text-xs mt-1 text-gray-900">
            If you wish to bussiness with us ?
          </p>
          <Link
            to="/provider/register"
            className="inline-flex items-center justify-center py-0.5 my-2 overflow-hidden text-sm font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-300 group-hover:to-blue-600 hover:text-white  focus:outline-none"
          >
            <span className="px-4 py-1.5 font-body text-base transition-all ease-in duration-7  rounded-md group-hover:bg-opacity-0">
              Register Now
            </span>
          </Link>
        </div>
      </main>
    </>
  );
};

export default ProviderAuth;
