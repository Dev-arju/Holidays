import React from "react";
import { BiRupee } from "react-icons/bi";

const PaymentPackages = ({ item, idForm }) => {
  const { register, formState } = idForm;
  const { errors } = formState;

  return (
    <div className="font-body mt-4">
      <h2 className="text-center text-gray-600 leading-relaxed text-xl font-semibold mb-2">
        Confirm Booking
      </h2>
      <div className="relative">
        <div className="bg-neutral-50">
          <p className="text-md font-medium text-white  bg-neutral-400 py-2 px-4">
            Identity Proof
          </p>

          <div className="font-body bg-inherit font-sm font-medium pt-6 pb-2 flex items-center gap-2 flex-wrap px-4">
            <div className="bg-inherit mb-2">
              <select
                data-label="title"
                id="title"
                className="flex-shrink bg-inherit focus:outline-none px-2.5 py-1.5 ring-[#999] text-gray-500 ring-1 rounded"
                {...register("title", {
                  validate: (val) => val !== "" || "title is mandatory",
                })}
              >
                <option hidden value="">
                  -- Title --
                </option>
                <option className="text-gray-500" value="mr">
                  Mr
                </option>
                <option className="text-gray-500" value="ms">
                  Mrs
                </option>
              </select>
              {errors?.title && (
                <p className="ps-2 text-xs text-red-600 font-medium">
                  {errors.title?.message}
                </p>
              )}
            </div>
            <div className="relative bg-inherit flex-grow  mb-2">
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "name is required",
                })}
                className="peer bg-transparent h-9 w-full rounded text-gray-500 placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
              >
                Name as id proof
              </label>
              {errors?.name && (
                <p className="ps-4 text-xs text-red-600 font-medium">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="relative bg-inherit flex-grow mb-2">
              <input
                type="text"
                id="documentName"
                {...register("documentName", {
                  required: "enter a valid document",
                })}
                className="peer bg-transparent h-9 w-full rounded text-gray-500 placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none"
                placeholder="doc"
              />
              <label
                htmlFor="documentName"
                className="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
              >
                Valid Document Name
              </label>
              {errors?.documentName && (
                <p className="ps-4 text-xs text-red-600 font-medium">
                  {errors.documentName?.message}
                </p>
              )}
            </div>
            <div className="relative bg-inherit flex-grow mb-2">
              <input
                type="text"
                id="documentNumber"
                {...register("documentNumber", {
                  required: "document number",
                })}
                className="peer bg-transparent h-9 w-full rounded text-gray-500 placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none"
                placeholder="doc"
              />
              <label
                htmlFor="documentNumber"
                className="absolute cursor-text left-0 -top-2 text-xs text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-xs transition-all"
              >
                Document Number / ID
              </label>
              {errors?.documentNumber && (
                <p className="ps-4 text-xs text-red-600 font-medium">
                  {errors.documentNumber?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="bg-neutral-50 relative h-64 overflow-scroll invisible-scrollbar">
          <p className="text-md sticky top-0 font-medium text-white  bg-neutral-400 py-2 px-4">
            Terms & Conditions
          </p>

          <div className="p-4 mt-2 max-w-4xl text-xs ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            impedit, nobis veniam, numquam illum ut adipisci laudantium dicta
            explicabo repellendus soluta vero? Recusandae alias unde quas
            temporibus ipsa ullam voluptates eos, cumque aliquid commodi libero
            beatae perspiciatis? Harum consectetur in quas explicabo aperiam
            atque assumenda porro dolorum. Dolorem, doloremque? Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Eius nihil temporibus
            ullam commodi accusantium architecto nisi placeat, eligendi beatae
            corrupti! Enim ut, dolor laboriosam doloremque accusantium? Quaerat
            distinctio laudantium delectus?
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 text-xs font-medium text-white  bg-neutral-400 py-0.5 px-4">
          <input
            type="checkbox"
            id="tc"
            {...register("tChecked", {
              validate: (val) =>
                val === true || "please check terms and condition",
            })}
            className="focus:outline-none "
          />
          <label htmlFor="tc" className="py-0.5">
            I accept terms and conditions
          </label>
          {errors?.tChecked && (
            <p className="ps-4 text-xs text-red-600 font-medium">
              {errors.tChecked?.message}
            </p>
          )}
        </div>
      </div>
      <div className="lg:hidden flex justify-center items-center my-6 ">
        <div className="font-body font-medium text-xs bg-neutral-50 rounded-b ">
          <p className="text-white bg-gray-500 px-6 py-2 shadow-sm rounded-t-lg">
            Amount you have to pay
          </p>
          <div className="flex justify-center items-center text-[36px] my-4">
            <BiRupee className="pt-1" />
            <span className="font-sans font-semibold">
              {item?.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPackages;
