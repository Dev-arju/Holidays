import React from "react";

const TravelOption = ({ form, toggle }) => {
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <div
      className={toggle ? "mx-2 my-4 bg-neutral-100 shadow-md p-4" : "hidden"}
    >
      <div className="pl-4 mb-4">
        <p className="font-body text-sm font-bold">Travel Options</p>
      </div>
      <div className="flex flex-wrap items-center gap-6 ">
        <div className="flex gap-2 items-center font-body text-neutral-800 text-sm font-medium">
          <label htmlFor="vehicleType" className="min-w-max">
            Vehicle Type :
          </label>
          <select
            id="vehicleType"
            {...register("travelling.vehicleType", {
              required: "select vehicle type",
              validate: (value) => {
                return value !== "select" || "Choose vehicle type";
              },
            })}
            className="text-black px-5 py-2 bg-white rounded-md focus:outline-none min-w-max"
          >
            <option value="select" hidden>
              select type
            </option>
            <option value="sedan">sedan</option>
            <option value="hatchback">hatchback</option>
            <option value="suv">suv</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="flex flex-grow items-center gap-2 font-body text-neutral-800 text-sm font-medium">
          <label htmlFor="modelName" className="min-w-max">
            Model Name :
          </label>
          <input
            type="text"
            id="modelName"
            {...register("travelling.modelName", {
              required: "enter vehicle model and company",
            })}
            className=" px-5 py-2 bg-white rounded-md focus:outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2 font-body text-neutral-800 text-sm font-medium">
          <label htmlFor="modelName" className="min-w-max">
            Seating Capacity
          </label>
          <input
            type="number"
            id="seats"
            {...register("travelling.seats", {
              valueAsNumber: true,
              validate: (value) => {
                return value !== 0 || "enter available seats";
              },
              required: "specify seats availibility",
            })}
            className="w-16 px-5 py-2 bg-white rounded-md focus:outline-none"
          />
        </div>
      </div>

      {errors.travelling && (
        <div className="mt-2 mb-4 grid grid-cols-1  sm:grid-cols-3 font-body font-medium text-red-600 text-sm">
          <span className="col-span-1">
            {errors.travelling.vehicleType?.message}
          </span>
          <span className="col-span-1">
            {errors.travelling.modelName?.message}
          </span>
          <span className="col-span-1">{errors.travelling.seats?.message}</span>
        </div>
      )}
    </div>
  );
};

export default TravelOption;
