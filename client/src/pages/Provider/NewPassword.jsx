import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/axios";
import LogoIcon from "../../components/LogoIcon";
import { DotLoader, PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const NewPassword = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search);
  const [password, setPassword] = useState("");
  const [payload, setPayload] = useState({});
  const [linkExpired, setLinkExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = queryParam.get("token");

  useEffect(() => {
    const verifyUrl = async () => {
      const response = await getRequest(`/provider/reset/${id}/${token}`);
      if (response.data) {
        setPayload(response.data);
        setLoading(false);
        setLinkExpired(false);
      }
      if (response.error) {
        console.log(response.error);
        setLoading(false);
        setLinkExpired(true);
      }
    };
    verifyUrl();
  }, []);

  const changePassword = async (e) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/.test(password)) {
      return toast.error(
        "Password must be contain one uppercase one lowercase one digit and 8 to 12 characters"
      );
    }
    if (password !== confirmPassword) {
      return toast.error("password and confirm password dont match");
    }
    const button = e.target;
    const loader = document.getElementById("saving");
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/.test(password) &&
      password === confirmPassword
    ) {
      button.classList.add("hidden");
      loader.classList.replace("hidden", "flex");
      const response = await postRequest("/provider/update-password", {
        id: payload.id,
        password,
      });

      if (response.data) {
        loader.classList.replace("flex", "hidden");
        button.classList.remove("hidden");
        return navigate("/provider/auth?password=reset", { replace: true });
      }
      if (response.error) {
        console.log(response.error);
        loader.classList.replace("flex", "hidden");
        button.classList.remove("hidden");
        toast.error(response.error.message || response.message);
      }
    }
  };

  return loading ? (
    <div className="flex justify-center bg-emerald-100 items-center w-full h-screen">
      <DotLoader size={100} color="#36d7b7" />
    </div>
  ) : linkExpired ? (
    <div className="w-full h-screen flex flex-col justify-center ">
      <h2 className="font-body text-2xl text-red-600 text-center">
        Password Reset Link Expired !
      </h2>
    </div>
  ) : (
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
              Reset Password
            </h2>
            <h4 className="mt-1 font-body text-sm text-gray-600">
              please enter your password
            </h4>
          </div>
          <div className="flex flex-col mt-8 pr-8">
            <label
              htmlFor="password"
              className="font-body text-sm mb-0.5 text-black font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="focus:outline-none mb-1.5 border rounded-sm border-gray-500 focus:border-emerald-500 focus:text-emerald-600 p-2 text-sm text-gray-600 font-body"
            />
            <label
              htmlFor="confirmPassword"
              className="font-body text-sm mb-0.5 text-black font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=""
              className="focus:outline-none border rounded-sm border-gray-500 focus:border-emerald-500 focus:text-emerald-600 p-2 text-sm text-gray-600 font-body"
            />
            <button
              onClick={changePassword}
              className="bg-emerald-800 rounded-sm text-white font-body py-2 mt-2"
            >
              Save New Password
            </button>
            <div className="hidden justify-center mt-2" id="saving">
              <PulseLoader color="#36d7b7" />
            </div>
          </div>
        </div>
        <div className="md:col-span-3 hidden md:flex justify-center items-center w-full h-full bg-amber-200">
          <img
            src="/src/assets/reset.png"
            className="scale-75"
            alt="reset.png"
          />
        </div>
      </div>
    </>
  );
};

export default NewPassword;
