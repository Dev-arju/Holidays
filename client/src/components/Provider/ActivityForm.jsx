import React from "react";
import { createPortal } from "react-dom";

const ActivityForm = ({ index, append, form, setDataEntry }) => {
  const { register, trigger, formState } = form;
  const { errors } = formState;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (await trigger("activity")) {
      if (index < 4) {
        append({ type: "", location: "", description: "", image: null });
        setDataEntry((prev) => {
          return {
            ...prev,
            open: !prev.open,
          };
        });
      }
    }
  };

  return createPortal(
    <>
      <div
        className="fixed top-0 bottom-0 right-0 left-0 "
        style={{ background: "rgba(0,0,0,0.7)" }}
      />
      <div className="fixed bg-emerald-500 p-8 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
        <h2 className="text-center font-bold text-lg my-2 border-b border-sky-100">
          Add New Activity
        </h2>
        <form noValidate className="font-body text-sm m-8" onSubmit={onSubmit}>
          <div className="flex gap-4">
            <label htmlFor="type" className="font-bold text-gray-600">
              Activity Type
            </label>
            <input
              type="text"
              className="flex-grow rounded-md focus:border border-sky-500 focus:outline-none p-2 bg-sky-200"
              id="type"
              placeholder="eg: sight-seeing, trucking, etc..."
              {...register(`activity.${index}.type`, {
                required: "activity type is required",
              })}
            />
          </div>
          <p className="text-right pr-4 text-red-800 text-xs font-semibold">
            {errors.activity?.[index]?.type?.message}
          </p>
          <div className="flex gap-4 mt-4">
            <label htmlFor="location" className="font-bold text-gray-600">
              Location
            </label>
            <input
              type="text"
              className="flex-grow rounded-md focus:border border-sky-500 focus:outline-none p-2 bg-sky-200"
              id="location"
              placeholder="place of event"
              {...register(`activity.${index}.location`, {
                required: "location is required",
              })}
            />
          </div>
          <p className="text-right pr-4 text-red-800 text-xs font-semibold">
            {errors.activity?.[index]?.location?.message}
          </p>
          <div className="flex gap-4 mt-4">
            <label htmlFor="description" className="font-bold text-gray-600">
              Description
            </label>
            <textarea
              type="text"
              className="flex-grow rounded-md focus:border border-sky-500 focus:outline-none p-2 bg-sky-200 h-16"
              id="description"
              {...register(`activity.${index}.description`, {
                required: "description is required",
              })}
            />
          </div>
          <p className="text-right pr-4 text-red-800 text-xs font-semibold">
            {errors.activity?.[index]?.description?.message}
          </p>
          <div className="flex gap-4 mt-4">
            <label htmlFor="image" className="font-bold text-gray-600">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="flex-grow rounded-md p-2 bg-sky-200 file:hidden"
              id="image"
              {...register(`activity.${index}.image`, {
                required: "add a supporting image",
              })}
            />
          </div>
          <p className="text-right pr-4 text-red-800 text-xs font-semibold">
            {errors.activity?.[index]?.image?.message}
          </p>
          <div className="flex gap-4 justify-center mt-8 mb-4">
            <button
              className=" bg-red-400 transition-all duration-300 text-black font-bold rounded-lg px-2.5 py-2.5 hover:bg-red-600"
              type="button"
              onClick={() =>
                setDataEntry((prev) => ({ ...prev, open: !prev.open }))
              }
            >
              close
            </button>
            <button
              className=" bg-blue-600 transition-all duration-300 font-bold rounded-lg px-2.5 py-1.5 text-white hover:bg-blue-900"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default ActivityForm;
