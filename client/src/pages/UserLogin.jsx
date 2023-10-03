import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import LogoIcon from "../components/LogoIcon";
import Footer from "../components/Footer";
import { setCredentials, setError } from "../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import GoogleBtn from "../components/GoogleBtn";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { postRequest } from "../utils/axios";

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInpFocus = (e) => {
    const inpDiv = e.target.parentElement;
    inpDiv.classList.replace("border-neutral-400", "border-black");
    inpDiv.classList.replace("text-neutral-400", "text-black");
  };
  const handleInpBlur = (e) => {
    const inpDiv = e.target.parentElement;
    inpDiv.classList.replace("border-black", "border-neutral-400");
    inpDiv.classList.replace("text-black", "text-neutral-400");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegEx.test(email)) {
      toast.error("invalid email address");
    }
    if (!passwordRegEx.test(password)) {
      toast.error(
        "password should be 8 characters and contains letters, numbers and special characters"
      );
    }
    if (emailRegEx.test(email) && passwordRegEx.test(password)) {
      const response = await postRequest("/users/auth", {
        email,
        password,
      });
      if (response.status === 201) {
        dispatch(setCredentials(response.data));
        navigate("/", { replace: true });
      }
      if (response.error) {
        console.log(response.error.message);
        toast.error(response.error.message);
        dispatch(setError(response.error.message));
      }
    }
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
      <GoogleOAuthProvider clientId="435341855399-gnoa82e7qu6lomcefv578bvukp3vngt5.apps.googleusercontent.com">
        <section className="flex justify-center bg-neutral-50 py-16">
          <div className="px-2 py-4 rounded-md w-80 bg-white shadow-md ">
            <div className="flex justify-center">
              <LogoIcon />
            </div>

            <div className="mt-12">
              <h4 className="mb-2 font-mono text-center">Login Account</h4>
              <form action="#" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 border-2 text-neutral-400 border-neutral-400 px-2 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="email"
                    className="focus:outline-none p-0 text-sm font-body font-semibold"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={handleInpFocus}
                    onBlur={handleInpBlur}
                  />
                </div>
                <div className="flex items-center gap-2 border-2 text-neutral-400 border-neutral-400 mt-4 mb-2 px-2 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>

                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    className="focus:outline-none p-0 text-sm font-body font-semibold"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleInpFocus}
                    onBlur={handleInpBlur}
                  />
                </div>

                <p className="text-right text-neutral-400 font-body font-medium text-xs cursor-pointer">
                  <span className="hover:text-black">forgot password ?</span>
                </p>
                <div className="flex justify-center mt-4 mb-2">
                  <button
                    type="submit"
                    className="py-2 text-center w-full border-2 border-black rounded-sm font-body font-bold text-sm hover:bg-black hover:text-white"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
            <hr className="text-neutral-600 mb-4" />
            <h4 className="text-center text-xs text-neutral-400 mb-2">
              Don't have an account? register / continue with google
            </h4>
            <div className="flex justify-center  mx-2 gap-2 items-center">
              <button
                className="transition ease-in  duration-300 hover:scale-110 font-body font-bold text-sm py-2 w-1/3 border-2 border-violet-600  hover:bg-violet-600 hover:text-white rounded-sm"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
              <GoogleBtn />
            </div>
          </div>
        </section>
      </GoogleOAuthProvider>
      <Footer />
    </>
  );
};

export default UserLogin;
