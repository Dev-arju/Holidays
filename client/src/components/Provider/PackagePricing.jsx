import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { postRequest, setAccessToken } from "../../utils/axios";
import { toast } from "react-toastify";

const PackagePricing = ({ packageInfo, dailySchedules }) => {
  const navigate = useNavigate();
  const coverImage = useRef(null);
  const priceInput = useRef(null);
  const { authData } = useSelector((state) => state.provider);
  const { token } = authData;

  useEffect(() => {
    const coverPhotoUrl = () => {
      const reader = new FileReader();
      reader.onload = () => {
        coverImage.current.src = reader.result;
      };
      reader.readAsDataURL(packageInfo.coverImage[0]);
    };
    coverPhotoUrl();
  }, []);

  const activityCount = useMemo(() => {
    let count = 0;
    dailySchedules.forEach((day) => {
      if (day.activity.length > 0) {
        count += day.activity.length;
      }
    });
    return count;
  }, [dailySchedules]);

  const submitPackage = async (e) => {
    e.stopPropagation();
    e.target.disabled = true;
    const price = parseInt(priceInput.current.value);
    if (!price) {
      e.target.disabled = false;
      return toast.error("price must be valid");
    }

    const formData = new FormData();
    formData.append("packageName", packageInfo.packageName);
    formData.append("dayCount", packageInfo.dayCount);
    formData.append("nightCount", packageInfo.nightCount);
    formData.append("summary", packageInfo.summary);
    packageInfo.phoneNumbers.forEach((num) => {
      formData.append("phoneNumbers[]", num);
    });
    formData.append("adults", packageInfo.adults);
    formData.append("children", packageInfo.children);
    for (let i = 0; i < packageInfo.coverImage.length; i++) {
      formData.append("coverImage", packageInfo.coverImage[i]);
    }
    formData.append("price", price);

    dailySchedules.forEach((day, index) => {
      if (day.accomodation?.image?.length > 0) {
        formData.append(`Day${index + 1}-property`, day.accomodation.image[0]);
        delete day.accomodation.image;
      }
      if (day.foodOptions.length > 0) {
        day.foodOptions.forEach((food) => {
          if (food?.foodImage?.length > 0) {
            formData.append(`Day${index + 1}-foods`, food.foodImage[0]);
          }
          delete food.foodImage;
        });
      }
      if (day.activity.length > 0) {
        day.activity.forEach((item) => {
          if (item?.image?.length > 0) {
            formData.append(`Day${index + 1}-activity`, item.image[0]);
          }
          delete item.image;
        });
      }
    });
    const jsonString = JSON.stringify(dailySchedules);
    formData.append("dailySchedules", jsonString);
    console.log(formData);

    setAccessToken(token);
    const headers = { headers: { "Content-Type": "multipart/form-data" } };
    const { data, error, message } = await postRequest(
      "/provider/package/add",
      formData,
      headers
    );
    e.target.disabled = false;
    if (data) {
      console.log(data);

      toast.success("new package added");
      return navigate("/provider/packages");
    }
    if (error) {
      console.log(error, message);

      toast.error(error?.message || message);
      return navigate("/provider/packages/add");
    }
  };

  return (
    <div className="bg-neutral-50 grid grid-cols-2 md:grid-cols-4 gap-5 px-4 mt-6 pt-8 pb-4 rounded-lg">
      <div className="col-span-2 text-base font-body font-medium bg-inherit">
        <p>
          <span className="border-b text-lg font-semibold">Review Package</span>
        </p>
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-gray-600 text-sm">package name</h4>
            <h4>{packageInfo.packageName}</h4>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-gray-600 text-sm">package duration</h4>
            <h4>{packageInfo.dayCount} days</h4>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-gray-600 text-sm">Activities Count</h4>
            <h4>{activityCount}</h4>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <h4 className="text-gray-600 text-sm underline">about package</h4>
            <h4 className="text-xs mb-2">{packageInfo.summary}</h4>
          </div>
        </div>

        <p className="mt-8">
          <span className="border-b text-lg font-semibold">Price Details</span>
        </p>

        <div className="bg-inherit mt-4">
          <div className="relative bg-inherit mb-2">
            <input
              type="number"
              id="name"
              ref={priceInput}
              className="peer bg-transparent w-56 py-2.5 rounded-lg text-sm  text-gray-600 placeholder-shown:text-sm placeholder-transparent px-2 border  focus:border-sky-600 focus:outline-none "
              placeholder="price"
            />
            <label
              htmlFor="name"
              className="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
            >
              Package Price
            </label>
          </div>
        </div>
      </div>
      <div className="col-span-2 order-first text-base font-body font-medium overflow-hidden rounded-lg shadow-lg">
        <img ref={coverImage} src="" alt="" className="w-full h-full" />
      </div>
      <div className="col-span-2 md:col-span-4 flex justify-center items-center p-4">
        <button
          onClick={submitPackage}
          className="px-8 py-1.5 font-tabs text-lg text-white bg-blue-600 rounded-lg ring-2 shadow-md hover:bg-transparent hover:text-blue-800 ring-blue-600 transition-all duration-300"
        >
          save
        </button>
      </div>
    </div>
  );
};

export default PackagePricing;
