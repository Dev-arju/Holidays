import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../../utils/axios";
import LogoIcon from "../../components/LogoIcon";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const resetHandler = async (e) => {
    const button = e.target;
    const loader = document.getElementById("sending");
    if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
      return toast.error("enter a valid email");
    }
    button.classList.add("hidden");
    loader.classList.replace("hidden", "flex");

    const response = await postRequest("/provider/reset", { email });
    if (response.data) {
      loader.classList.replace("flex", "hidden");
      button.classList.remove("hidden");
      return toast.success(response.data);
    }

    if (response.error) {
      console.log(response.error);
      loader.classList.replace("flex", "hidden");
      button.classList.remove("hidden");
      toast.error(response.error.message || response.message);
    }
  };

  return (
    <>
      <ToastContainer
        style={{ width: "480px" }}
        limit={2}
        pauseOnFocusLoss={false}
        position="bottom-left"
      />
      <div className="grid grid-cols-1 md:grid-cols-5 items-center h-screen">
        <div className="justify-self-center md:col-span-2 h-full w-full text-emerald-800 py-12 px-8">
          <LogoIcon />
          <div className="mt-16">
            <Link
              to="/provider/auth"
              className="font-body text-xs my-2 font-semibold"
            >
              Back to Login
            </Link>
            <h2 className="font-body font-bold text-2xl pt-2 text-black">
              Forget Password
            </h2>
            <h4 className="mt-1 font-body text-sm text-gray-600">
              Send a link to your email to reset your password
            </h4>
          </div>
          <div className="flex flex-col mt-8 pr-8">
            <label
              htmlFor="email"
              className="font-body text-sm mb-1 text-black font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="focus:outline-none border rounded-sm border-gray-500 focus:border-emerald-500 focus:text-emerald-600 p-2 text-sm text-gray-600 font-body"
            />
            <button
              onClick={resetHandler}
              className="bg-emerald-800 rounded-sm text-white font-body py-2 mt-2"
            >
              Send Reset Link
            </button>
            <div className="hidden justify-center mt-2" id="sending">
              <BeatLoader color="#36d7b7" />
            </div>
          </div>
        </div>
        <div className="md:col-span-3 hidden md:flex justify-center items-center w-full h-full bg-amber-200">
          <img src="/src/assets/forget.png" alt="forget.png" />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
