import React, { useState } from "react";
import LogoIcon from "../LogoIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequest } from "../../utils/axios";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    password: "",
    retypePassword: "",
  });

  const checkEmail = (email) => {
    return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
  };
  const checkMobile = (mob) => {
    return /^\d{10}$/.test(mob);
  };

  const checkPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/.test(password);
  };

  const submitPersonalInfo = async (e) => {
    e.stopPropagation();
    e.target.disabled = true;
    if (personalInfo.name === "") toast.error("name is required");
    if (!checkEmail(personalInfo.email))
      toast.error("enter a valid email address");
    if (!checkMobile(personalInfo.mobile))
      toast.error("enter a valid mobile number");
    if (!checkPassword(personalInfo.password))
      toast.error(
        "password must contains 8 - 12 characters, one lowercase letter one uppercase letter and one digit"
      );
    if (personalInfo.password !== personalInfo.retypePassword)
      toast.error("password does not match");

    if (
      personalInfo.name !== "" &&
      checkEmail(personalInfo.email) &&
      checkMobile(personalInfo.mobile) &&
      checkPassword(personalInfo.password) &&
      personalInfo.password === personalInfo.retypePassword
    ) {
      const response = await postRequest("/provider/", personalInfo);
      if (response.status === 201) {
        console.log(response.data);
        e.target.disabled = false;
        return navigate(`bussiness/${response.data._id}`);
      }
      if (response.error) {
        console.log(response.error);
        toast.error(response.error.message || response.message);
      }
    }

    e.target.disabled = false;
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="flex flex-col items-center max-w-xl px-4 py-8 border shadow-lg border-gray-400 rounded-lg">
        <LogoIcon />
        <h2 className="mt-4 font-body text-sm text-center md:text-base font-medium">
          Create Bussiness Provider Account
        </h2>
        <p className="mt-2 font-body text-xs font-medium text-gray-600">
          Enter Your Personal Details
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 bg-slate-50">
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="name"
              value={personalInfo.name}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, name: e.target.value })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="Your Name"
            />
            <label
              htmlFor="name"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Your Name
            </label>
          </div>
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="surname"
              value={personalInfo.surname}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, surname: e.target.value })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="Surname (optional)"
            />
            <label
              htmlFor="surname"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Surname (optional)
            </label>
          </div>
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="email"
              value={personalInfo.email}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, email: e.target.value })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="email"
            />
            <label
              htmlFor="email"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Email
            </label>
          </div>
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="mob"
              value={personalInfo.mobile}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, mobile: e.target.value })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="mobile"
            />
            <label
              htmlFor="mob"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Mobile
            </label>
          </div>
          <div className="relative bg-inherit mb-2">
            <input
              type="password"
              id="password"
              value={personalInfo.password}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, password: e.target.value })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="password"
            />
            <label
              htmlFor="password"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Password
            </label>
          </div>
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="retypePassword"
              value={personalInfo.retypePassword}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  retypePassword: e.target.value,
                })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="retypePassword"
            />
            <label
              htmlFor="retypePassword"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Retype Password
            </label>
          </div>
        </div>
        <button
          onClick={submitPersonalInfo}
          className="mt-4 px-4 py-2 text-center text-xs font-bold bg-blue-500 text-white rounded-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
