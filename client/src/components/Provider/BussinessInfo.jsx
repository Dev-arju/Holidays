import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogoIcon from "../LogoIcon";
import { postRequest } from "../../utils/axios";
import { toast } from "react-toastify";

const BussinessInfo = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const [brandLogo, setBrandLogo] = useState(null);
  const logoImgElement = useRef(null);
  const [bussinessInfo, setBussinessInfo] = useState({
    brandName: "",
    gst: "",
    bussinessEmail: "",
    bussinessPhone: "",
  });

  const handleLogoInp = async (e) => {
    setBrandLogo(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      logoImgElement.current.src = reader.result;
    };
  };

  const checkEmail = (email) => {
    return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
  };
  const checkMobile = (mob) => {
    return /^\d{10}$/.test(mob);
  };

  const validateInputs = () => {
    if (!bussinessInfo.brandName) toast.error("enter company name");
    if (!checkEmail(bussinessInfo.bussinessEmail))
      toast.error("enter a valid email");
    if (!checkMobile(bussinessInfo.bussinessPhone))
      toast.error("only 10 digits number allowed");
    if (
      bussinessInfo.brandName &&
      checkEmail(bussinessInfo.bussinessEmail) &&
      checkMobile(bussinessInfo.bussinessPhone)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.target.disabled = true;
    if (!validateInputs()) return (e.target.disabled = false);
    const formData = new FormData();
    formData.append("id", providerId);
    formData.append("brandName", bussinessInfo.brandName);
    formData.append("gst", bussinessInfo.gst);
    formData.append("bussinessEmail", bussinessInfo.bussinessEmail);
    formData.append("bussinessPhone", bussinessInfo.bussinessPhone);
    formData.append("brandLogo", brandLogo);

    const response = await postRequest("/provider/bussiness", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      e.target.disabled = false;
      return navigate("/provider/auth?registration=success", {
        replace: true,
      });
    }
    if (response.error) {
      console.log(response.error.message);
      toast.error(response.error.message);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="flex flex-col items-center max-w-xl px-4 py-8 border shadow-lg border-gray-400 rounded-lg">
        <LogoIcon />
        <h2 className="mt-4 font-body text-sm text-center md:text-base font-medium">
          Create Bussiness Provider Account
        </h2>
        <p className="mt-2 font-body text-xs font-medium text-gray-600">
          Enter Your Bussiness Details
        </p>

        <div className="flex flex-col items-center mt-4">
          <img
            ref={logoImgElement}
            src="/src/assets/logoAvatar.png"
            alt="brand logo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoInp}
            className="hidden"
            id="brandLogo"
          />
          <label
            htmlFor="brandLogo"
            className="font-body shadow-sm mt-2 bg-gray-400 text-white rounded-sm px-4 py-1.5 cursor-pointer text-xs"
          >
            Upload Logo (optional)
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 bg-slate-50">
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="brandName"
              value={bussinessInfo.brandName}
              onChange={(e) =>
                setBussinessInfo({
                  ...bussinessInfo,
                  brandName: e.target.value,
                })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="bussiness name"
            />
            <label
              htmlFor="brandName"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Bussiness Name
            </label>
          </div>
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="gstNo"
              value={bussinessInfo.gst}
              onChange={(e) =>
                setBussinessInfo({ ...bussinessInfo, gst: e.target.value })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="GST number (optional)"
            />
            <label
              htmlFor="gstNo"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              GST number (optional)
            </label>
          </div>
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="bussinessEmail"
              value={bussinessInfo.bussinessEmail}
              onChange={(e) =>
                setBussinessInfo({
                  ...bussinessInfo,
                  bussinessEmail: e.target.value,
                })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="bussiness email"
            />
            <label
              htmlFor="bussinessEmail"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Bussiness Email
            </label>
          </div>
          <div className="relative bg-inherit mb-2">
            <input
              type="text"
              id="phone"
              value={bussinessInfo.bussinessPhone}
              onChange={(e) =>
                setBussinessInfo({
                  ...bussinessInfo,
                  bussinessPhone: e.target.value,
                })
              }
              className="peer bg-transparent h-8 w-56 rounded-sm text-gray-600 placeholder-shown:text-xs placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="mobile"
            />
            <label
              htmlFor="phone"
              className="absolute cursor-text left-0 -top-3 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Official Phone Number
            </label>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 text-center text-xs font-bold bg-blue-500 text-white rounded-sm"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default BussinessInfo;
