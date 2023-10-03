import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/Provider/ImageUpload";
import { toast } from "react-toastify";
import { postRequest } from "../../utils/axios";

const AddProperty = () => {
  const [coverImage, setCoverImage] = useState(null);
  const nameInp = useRef(null);
  const locationInp = useRef(null);
  const addressInp = useRef(null);
  const pincodeInp = useRef(null);
  const navigate = useNavigate();

  const verifyPincode = () => {
    return /^\d{6}$/.test(pincodeInp.current.value);
  };

  const nextClickHandler = async (e) => {
    e.stopPropagation();
    if (
      !nameInp.current.value ||
      !locationInp.current.value ||
      !addressInp.current.value ||
      !coverImage
    )
      return toast.error("please fill all details");
    if (!verifyPincode()) return toast.error("enter valid pincode");
    const formData = new FormData();
    formData.append("propertyName", nameInp.current.value);
    formData.append("propertyLocation", locationInp.current.value);
    formData.append("propertyAddress", addressInp.current.value);
    formData.append("propertyPincode", pincodeInp.current.value);
    for (let i = 0; i < coverImage.length; i++) {
      formData.append("coverImage", coverImage[i]);
    }
    const headers = { headers: { "Content-Type": "multipart/form-data" } };

    const response = await postRequest(
      "/provider/property/add",
      formData,
      headers
    );
    if (response.data) {
      toast.success("add price option and finish");
      navigate(`price-options/${response.data._id}`);
    }
    if (response.error) {
      console.log(response.error);
      toast.error(response.error.message || response.message);
    }
  };
  console.log("rendering");
  return (
    <>
      <div>
        <h2 className="text-center font-body leading-tight font-bold text-2xl">
          List New Property
        </h2>
      </div>
      <div className="flex justify-center gap-8 flex-wrap p-6">
        <div className="bg-neutral-50 shadow-lg flex flex-col gap-6 p-4  rounded-lg">
          <div className="relative bg-inherit">
            <input
              ref={nameInp}
              type="text"
              id="propertyName"
              className="peer bg-transparent h-10 w-80 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Property Name"
            />
            <label
              htmlFor="propertyName"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Property Name
            </label>
          </div>
          <div className="relative bg-inherit">
            <input
              ref={locationInp}
              type="text"
              id="propertyLocation"
              className="peer bg-transparent h-10 w-80 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Property Location"
            />
            <label
              htmlFor="propertyLocation"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-600 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Property Location
            </label>
          </div>
          <div className="relative bg-inherit">
            <textarea
              ref={addressInp}
              type="text"
              id="propertyAddress"
              className="peer bg-transparent h-36 w-80 rounded-lg text-gray-500 placeholder-transparent ring-2 py-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Property Address"
            />
            <label
              htmlFor="propertyAddress"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Property Address
            </label>
          </div>
          <div className="relative bg-inherit">
            <input
              ref={pincodeInp}
              type="text"
              id="pincode"
              className="peer bg-transparent h-10 w-80 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Pincode"
            />
            <label
              htmlFor="pincode"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Pincode
            </label>
          </div>
        </div>
        <ImageUpload setCoverImage={setCoverImage} coverImage={coverImage} />
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={nextClickHandler}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          save & continue
        </button>
      </div>
    </>
  );
};

export default AddProperty;
