import React from "react";
import { useForm } from "react-hook-form";

const PackageInfo = ({
  setPackageInfo,
  setTogglePackageInfo,
  setShowDailySchedule,
}) => {
  const form = useForm({
    defaultValues: {
      packageName: "",
      dayCount: 0,
      nightCount: 0,
      summary: "",
      phoneNumbers: ["", ""],
      adults: 0,
      children: 0,
      coverImage: [],
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    setPackageInfo(data);
    setTogglePackageInfo(false);
    setShowDailySchedule({ show: true, day: 1 });
  };

  return (
    <div className="bg-neutral-50 grid grid-cols-2 md:grid-cols-4 gap-5 px-4 mt-6 pt-8 pb-4 rounded-lg">
      <div className="relative bg-inherit col-span-2 ">
        <input
          type="text"
          id="packageName"
          {...register("packageName", {
            required: "package name is required",
          })}
          className="peer bg-transparent h-8 w-full rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
          placeholder="Package Name"
        />
        <label
          htmlFor="packageName"
          className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          Package Name
        </label>
        <p className="text-red-600 text-xs ps-2 pt-1">
          {errors.packageName?.message}
        </p>
      </div>
      <div className="relative bg-inherit col-span-1">
        <input
          type="number"
          id="dayCount"
          {...register("dayCount", {
            valueAsNumber: true,
            required: "total days is required",
            validate: (data) => data > 0 || "add minimum one day package",
          })}
          className="peer bg-transparent h-8 w-full rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
          placeholder="Total Days"
        />
        <label
          htmlFor="dayCount"
          className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          Total Days
        </label>
        <p className="text-red-600 text-xs ps-2 pt-1">
          {errors.dayCount?.message}
        </p>
      </div>
      <div className="relative bg-inherit col-span-1">
        <input
          type="number"
          id="nightCount"
          {...register("nightCount", {
            valueAsNumber: true,
            required: "total nights is required",
          })}
          className="peer bg-transparent h-8 w-full rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
          placeholder="Total Nights"
        />
        <label
          htmlFor="nightCount"
          className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          Total Nights
        </label>
        <p className="text-red-600 text-xs ps-2 pt-1">
          {errors.nightCount?.message}
        </p>
      </div>
      <div className="relative bg-inherit col-span-2">
        <textarea
          type="text"
          id="summary"
          {...register("summary", {
            required: "please describe about the package",
          })}
          className="peer bg-transparent h-44 w-full rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
          placeholder="ntg"
        />
        <label
          htmlFor="summary"
          className="absolute cursor-text left-0 -top-4 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          Summary
        </label>
        <p className="text-red-600 text-xs ps-2 pt-1">
          {errors.summary?.message}
        </p>
      </div>
      <div className="bg-inherit col-span-2">
        <div className="relative bg-inherit mb-6">
          <input
            type="text"
            id="contactOne"
            {...register("phoneNumbers.0", {
              required: "support contact number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "enter a valid mobile number",
              },
            })}
            className="peer bg-transparent h-8 w-full  rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none"
            placeholder="ntg"
          />
          <label
            htmlFor="contactOne"
            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Emergency contact 1
          </label>
          <p className="text-red-600 text-xs ps-2 pt-1">
            {errors.phoneNumbers?.[0]?.message}
          </p>
        </div>
        <div className="relative bg-inherit mb-4">
          <input
            type="text"
            id="contactTwo"
            {...register("phoneNumbers.1", {
              pattern: {
                value: /^\d{10}$/,
                message: "enter a valid mobile number",
              },
            })}
            className="peer bg-transparent h-8 w-full  rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none"
            placeholder="ntg"
          />
          <label
            htmlFor="contactTwo"
            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Emergency contact 2
          </label>
          <p className="text-red-600 text-xs ps-2 pt-1">
            {errors.phoneNumbers?.[1]?.message}
          </p>
        </div>
        <h2 className="text-center text-sm text-gray-800 font-serif font-bold mb-4">
          People Allowed
        </h2>
        <div className="flex gap-4 w-full bg-inherit">
          <div className="relative flex-grow bg-inherit">
            <input
              type="number"
              id="adults"
              {...register("adults", {
                valueAsNumber: true,
                required: "adults count is required",
                validate: (data) => data > 0 || "add allowed person count",
              })}
              className="peer bg-transparent h-8 w-full  rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="adults"
            />
            <label
              htmlFor="adults"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Adults
            </label>
            <p className="text-red-600 text-xs ps-2 pt-1">
              {errors.adults?.message}
            </p>
          </div>
          <div className="relative flex-grow bg-inherit">
            <input
              type="number"
              id="children"
              {...register("children", {
                valueAsNumber: true,
                required: "children count is required",
              })}
              className="peer bg-transparent h-8 w-full rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="children"
            />
            <label
              htmlFor="children"
              className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
            >
              Children
            </label>
            <p className="text-red-600 text-xs ps-2 pt-1">
              {errors.children?.message}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2  md:col-span-4">
        <div className="flex flex-wrap justify-center gap-4 md:justify-start items-center">
          <label
            htmlFor="coverImage"
            className="font-serif px-4 py-2 bg-blue-500 text-gray-50 rounded-sm"
          >
            Choose Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="coverImage"
            {...register("coverImage", {
              required: "upload images",
              validate: (files) => {
                return files.length <= 2 || "upload maximum 2 images only";
              },
            })}
            className="focus:outline-none file:hidden text-gray-600 p-2"
            multiple
          />
        </div>

        <p className="text-red-600 text-xs ps-2 pt-1">
          {errors.coverImage?.message}
        </p>
      </div>
      <div className="col-span-2 md:col-span-4">
        <div className="flex justify-center">
          <button
            onClick={handleSubmit(onSubmit)}
            className="font-mono rounded-md text-sm px-5 py-2 bg-sky-500 hover:bg-sky-800 hover:font-bold text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageInfo;
