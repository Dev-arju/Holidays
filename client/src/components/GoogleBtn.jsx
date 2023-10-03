import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { postRequest } from "../utils/axios";
import { setCredentials, setError } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const GoogleBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const response = await postRequest("/users/auth/google", {
        code: codeResponse.code,
      });
      if (response.status === 201) {
        dispatch(setCredentials(response.data));
        navigate("/", { replace: true });
      }
      if (response.error) {
        dispatch(setError(response.error.message));
        toast.error(response.message);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div
      className="transition ease-in-out  w-2/3 flex justify-center items-center hover:scale-110 duration-300"
      onClick={googleLogin}
    >
      <button className="font-body font-bold text-sm py-2 w-2/4 rounded-sm">
        Sign with
      </button>
      <FcGoogle className="cursor-pointer" />
    </div>
  );
};

export default GoogleBtn;
