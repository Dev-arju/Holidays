import React from "react";

const Inputs = () => {
  return (
    <div className="bg-neutral-50 shadow-lg flex flex-col gap-6 p-4 rounded-lg">
      <div className="relative bg-inherit">
        <input
          type="text"
          id="propertyName"
          className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
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
          type="text"
          id="propertyLocation"
          className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
          placeholder="Property Location"
        />
        <label
          htmlFor="propertyLocation"
          className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          Property Location
        </label>
      </div>
      <div className="relative bg-inherit">
        <textarea
          type="text"
          id="propertyAddress"
          className="peer bg-transparent h-36 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
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
          type="text"
          id="pincode"
          className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
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
  );
};

export default Inputs;
