import React, { useEffect, useRef } from "react";

const Stay = ({ form, toggle }) => {
  const stayImage = useRef(null);
  const { register, formState, watch, getValues } = form;
  const { errors } = formState;
  const uploadAvatar = "/src/assets/forget.png";

  useEffect(() => {
    const image = getValues("accomodation.image");
    if (image.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        stayImage.current.src = reader.result;
        if (stayImage.current.classList.contains("object-contain")) {
          stayImage.current.classList.remove("object-contain");
        }
        stayImage.current.classList.add("object-cover");
      };
      reader.readAsDataURL(image[0]);
    } else {
      stayImage.current.src = uploadAvatar;
      if (stayImage.current.classList.contains("object-cover")) {
        stayImage.current.classList.remove("object-cover");
      }
      stayImage.current.classList.add("object-contain");
    }
  }, [watch("accomodation.image")]);

  return (
    <div
      className={toggle ? "mx-2 my-4 bg-neutral-100 shadow-md p-4" : "hidden"}
    >
      <div className="pl-4 mb-4">
        <p className="font-body text-sm font-bold">Accomodation Details</p>
      </div>
      <div className="bg-inherit grid grid-cols-1 sm:grid-cols-2">
        <div className="col-span-1 p-4 bg-inherit">
          <div className="relative bg-inherit mb-4">
            <input
              type="text"
              id="type"
              {...register("accomodation.type", {
                required: "accomodation type is required",
              })}
              className="peer w-2/4 bg-transparent rounded-sm text-gray-500 placeholder-transparent ring-2 px-2 py-1 ring-gray-500 focus:ring-sky-600 focus:outline-none"
              placeholder="type"
            />
            <label
              htmlFor="type"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Accomodation Type
            </label>
            <p className="pt-1 pl-2 text-xs font-medium text-red-600">
              {errors.accomodation?.type?.message}
            </p>
          </div>
          <div className="relative bg-inherit mb-4">
            <input
              type="text"
              id="name"
              {...register("accomodation.name", {
                required: "accomodation name is required",
              })}
              className="peer w-3/4 bg-transparent rounded-sm text-gray-500 placeholder-transparent ring-2 px-2 py-1 ring-gray-500 focus:ring-sky-600 focus:outline-none"
              placeholder="type"
            />
            <label
              htmlFor="name"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Hotel / HomeStay Name
            </label>
            <p className="pt-1 pl-2 text-xs font-medium text-red-600">
              {errors.accomodation?.name?.message}
            </p>
          </div>
          <div className="relative bg-inherit">
            <input
              type="text"
              id="location"
              {...register("accomodation.location", {
                required: "accomodation location is required",
              })}
              className="peer w-3/4 bg-transparent rounded-sm text-gray-500 placeholder-transparent ring-2 px-2 py-1 ring-gray-500 focus:ring-sky-600 focus:outline-none"
              placeholder="type"
            />
            <label
              htmlFor="location"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Accomodation Place
            </label>
            <p className="pt-1 pl-2 text-xs font-medium text-red-600">
              {errors.accomodation?.location?.message}
            </p>
          </div>
        </div>
        <div className="col-span-1 relative w-full max-h-max overflow-hidden rounded-md shadow-lg">
          <input
            type="file"
            id="stayImage"
            accept="image/*"
            {...register("accomodation.image")}
            className="hidden"
          />
          <label
            htmlFor="stayImage"
            style={{ background: "rgba(255, 255, 255, 0.6)" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 rounded-md font-semibold text-sm cursor-pointer z-30"
          >
            Upload Image <span className="text-xs text-red-500 ">optional</span>
          </label>
          <img
            ref={stayImage}
            alt="accomodation image"
            className="min-h-max w-full aspect-video"
          />
        </div>
      </div>
    </div>
  );
};

export default Stay;
