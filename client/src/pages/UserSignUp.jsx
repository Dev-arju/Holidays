import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRequest } from "../utils/axios";
import { setCredentials, setError } from "../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import LogoIcon from "../components/LogoIcon";
import {
  MdDriveFileRenameOutline,
  MdOutlineAlternateEmail,
} from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { Si1Password } from "react-icons/si";
import Footer from "../components/Footer";
import GoogleBtn from "../components/GoogleBtn";
import { GoogleOAuthProvider } from "@react-oauth/google";

const UserSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [promo, setPromo] = useState(false);
  const nameRegEx = /^[A-Za-z]+(?:\s[A-Za-z]+)?\s[A-Za-z]+$/;
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  function checkAge(bithDate) {
    const birthDate = new Date(bithDate);
    const currentDate = new Date();
    const timeDiff = currentDate - birthDate;
    const yearDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    if (yearDiff >= 18 && yearDiff <= 90) {
      return true;
    }
    return false;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const nameDiv = document.getElementById("name").parentElement;
    const emailDiv = document.getElementById("email").parentElement;
    const dobDiv = document.getElementById("dob").parentElement;
    const passwordDiv = document.getElementById("password").parentElement;
    const confirmPassDiv = document.getElementById("confirmPass").parentElement;

    if (!nameRegEx.test(name)) {
      nameDiv.classList.replace("border-neutral-400", "border-red-600");
      toast.error("Name should contain first name and last name");
    }
    if (!emailRegEx.test(email)) {
      emailDiv.classList.replace("border-neutral-400", "border-red-600");
      toast.error("Invalid email");
    }
    if (!passwordRegEx.test(password)) {
      passwordDiv.classList.replace("border-neutral-400", "border-red-600");
      toast.error(
        "password should be 8 characters and contains letters, numbers and special characters"
      );
    }
    if (confirmPass !== password || !passwordRegEx.test(password)) {
      confirmPassDiv.classList.replace("border-neutral-400", "border-red-600");
      toast.error("password do not match");
    }
    if (!checkAge(dob)) {
      dobDiv.classList.replace("border-neutral-400", "border-red-600");
      toast.error("age should be morethan or equal to 18");
    }

    if (
      nameRegEx.test(name) &&
      emailRegEx.test(email) &&
      passwordRegEx.test(password) &&
      confirmPass === password &&
      checkAge(dob)
    ) {
      const response = await postRequest("/users", {
        name,
        email,
        password,
        dob,
        promo,
      });
      if (response.data) {
        dispatch(setCredentials(response.data));
        navigate("/", { replace: true });
      }
      if (response.error) {
        dispatch(setError(response.error.message));
        toast.error(response.error.message);
      }
    }
  };
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
  return (
    <>
      <Navbar />
      <ToastContainer />
      <GoogleOAuthProvider clientId="435341855399-gnoa82e7qu6lomcefv578bvukp3vngt5.apps.googleusercontent.com">
        <section className="flex justify-center bg-neutral-50 py-8">
          <div className="px-2 py-4 rounded-md w-80 bg-white shadow-md ">
            <div className="flex justify-center">
              <LogoIcon />
            </div>

            <div className="mt-8">
              <h4 className="mb-2 font-mono text-center">Register Account</h4>
              <form
                action="#"
                onSubmit={handleFormSubmit}
                className="font-mono text-xs text-black"
              >
                <label htmlFor="name">Full Name</label>
                <div className="flex items-center gap-2 border-2 text-neutral-400 border-neutral-400 px-2 mb-2 py-1">
                  <MdDriveFileRenameOutline />
                  <input
                    type="text"
                    placeholder="enter your full name"
                    id="name"
                    value={name}
                    className="focus:outline-none p-0 text-sm"
                    onChange={(e) => {
                      if (
                        nameRegEx.test(e.target.value) &&
                        e.target.parentElement.classList.contains(
                          "border-red-600"
                        )
                      ) {
                        e.target.parentElement.classList.replace(
                          "border-red-600",
                          "border-neutral-400"
                        );
                      }
                      setName(e.target.value);
                    }}
                    onFocus={handleInpFocus}
                    onBlur={handleInpBlur}
                  />
                </div>
                <label htmlFor="email">E-mail</label>
                <div className="flex items-center gap-2 border-2 text-neutral-400 border-neutral-400 px-2 mb-2 py-1">
                  <MdOutlineAlternateEmail />

                  <input
                    type="text"
                    placeholder="email"
                    id="email"
                    value={email}
                    className="focus:outline-none p-0 text-sm"
                    onChange={(e) => {
                      if (
                        emailRegEx.test(e.target.value) &&
                        e.target.parentElement.classList.contains(
                          "border-red-600"
                        )
                      ) {
                        e.target.parentElement.classList.replace(
                          "border-red-600",
                          "border-neutral-400"
                        );
                      }
                      setEmail(e.target.value);
                    }}
                    onFocus={handleInpFocus}
                    onBlur={handleInpBlur}
                  />
                </div>
                <label htmlFor="dob">Date of Birth</label>
                <div className="flex items-center gap-2 border-2 text-neutral-400 border-neutral-400 px-2 mb-2 py-1">
                  <BsCalendarDateFill />
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    className="focus:outline-none p-0 text-sm "
                    onChange={(e) => {
                      if (
                        checkAge(e.target.value) &&
                        e.target.parentElement.classList.contains(
                          "border-red-600"
                        )
                      ) {
                        e.target.parentElement.classList.replace(
                          "border-red-600",
                          "border-neutral-400"
                        );
                      }
                      setDob(e.target.value);
                    }}
                    onFocus={handleInpFocus}
                    onBlur={handleInpBlur}
                  />
                </div>
                <label htmlFor="password">Create Password</label>
                <div className="flex items-center gap-2 border-2 text-neutral-400 border-neutral-400 px-2 mb-2 py-1">
                  <Si1Password />
                  <input
                    type="text"
                    placeholder="enter new password."
                    id="password"
                    value={password}
                    className="focus:outline-none p-0 text-sm"
                    onChange={(e) => {
                      if (
                        passwordRegEx.test(e.target.value) &&
                        e.target.parentElement.classList.contains(
                          "border-red-600"
                        )
                      ) {
                        e.target.parentElement.classList.replace(
                          "border-red-600",
                          "border-neutral-400"
                        );
                      }
                      setPassword(e.target.value);
                    }}
                    onFocus={handleInpFocus}
                    onBlur={handleInpBlur}
                  />
                </div>
                <label htmlFor="confirmPass">Confirm Password</label>
                <div className="flex items-center gap-2 border-2 text-neutral-400 border-neutral-400 px-2 mb-2 py-1">
                  <RiLockPasswordLine />
                  <input
                    type="password"
                    placeholder="re enter new password."
                    id="confirmPass"
                    value={confirmPass}
                    className="focus:outline-none p-0 text-sm"
                    onChange={(e) => {
                      if (
                        password === e.target.value &&
                        passwordRegEx.test(e.target.value) &&
                        e.target.parentElement.classList.contains(
                          "border-red-600"
                        )
                      ) {
                        e.target.parentElement.classList.replace(
                          "border-red-600",
                          "border-neutral-400"
                        );
                      }
                      setConfirmPass(e.target.value);
                    }}
                    onFocus={handleInpFocus}
                    onBlur={handleInpBlur}
                  />
                </div>
                <div className="flex items-center gap-2  text-neutral-400  px-2 mb-2 py-1">
                  <input
                    type="checkbox"
                    id="promo"
                    value={promo}
                    onChange={(e) => setPromo(e.target.checked)}
                    className="focus:outline-none p-0 text-sm"
                  />
                  <label htmlFor="promo" className="cursor-pointer">
                    emails to get updates and offers
                  </label>
                </div>
                <div className="px-2 mb-2 py-1 text-center">
                  By creating an account, you agree to Privacy Policy and Terms
                  of Use.
                </div>
                <div className="flex justify-center mt-4 mb-2">
                  <button
                    type="submit"
                    className="py-2 text-center w-full border-2 border-black rounded-sm font-body font-bold text-sm hover:bg-black hover:text-white"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
            <hr className="text-neutral-600 mb-4" />
            <p className="text-center text-xs font-sans underline mb-2">
              Already have an account?
            </p>
            <div className="flex justify-center mx-2 gap-2 items-center">
              <button
                className="transition ease-in  duration-300 hover:scale-110 font-body font-bold text-sm py-2 w-1/3 border-2 border-primary  hover:bg-primary  hover:text-white rounded-sm"
                onClick={() => navigate("/auth")}
              >
                Sign In
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

export default UserSignUp;
