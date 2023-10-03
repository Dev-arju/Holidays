import React from "react";
import { useFieldArray } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";

const FoodOptions = ({ form, toggle }) => {
  const { register, formState, control, trigger } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "foodOptions",
    control,
  });

  const onSubmit = async () => {
    const isValid = await trigger("foodOptions");
    if (isValid && fields.length < 5) {
      append({ type: "", food: "", foodImage: {} });
    }
  };

  return (
    <div
      className={toggle ? "mx-2 my-4 bg-neutral-100 shadow-md p-4" : "hidden"}
    >
      <div className="pl-4 mb-4">
        <p className="font-body text-sm font-bold">Food Options</p>
      </div>
      {fields.map((field, index) => {
        return (
          <div
            className="relative bg-inherit grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mt-4 pe-8"
            key={field.id}
          >
            {index > 0 && (
              <div
                onClick={() => remove(index)}
                className="absolute -right-1 bg-red-700 rounded-full p-2 cursor-pointer text-white"
              >
                <AiOutlineDelete className="m-auto" />
              </div>
            )}

            <div className="relative bg-inherit col-span-1">
              <input
                type="text"
                id={`type-${index}`}
                {...register(`foodOptions.${index}.type`, {
                  required: "food type is required",
                })}
                className="peer bg-transparent h-8 w-full rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Total Days"
              />
              <label
                htmlFor={`type-${index}`}
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >
                type
              </label>
              <p className="pl-2 pt-1 font-medium text-red-600 text-xs">
                {errors.foodOptions?.[index]?.type?.message}
              </p>
            </div>
            <div className="relative bg-inherit col-span-1 md:col-span-2">
              <input
                type="text"
                id={`food-${index}`}
                {...register(`foodOptions.${index}.food`, {
                  required: "enter name of the food",
                })}
                className="peer bg-transparent h-8 w-full rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Package Name"
              />
              <label
                htmlFor={`food-${index}`}
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >
                Food
              </label>
              <p className="pl-2 pt-1 font-medium text-red-600 text-xs">
                {errors.foodOptions?.[index]?.food?.message}
              </p>
            </div>

            <div className="bg-inherit col-span-2 md:col-span-1 font-body text-xs">
              <div className="bg-inherit flex items-center gap-2 h-8 px-2 rounded-lg ring-2 ring-gray-500">
                <label
                  htmlFor={`foodImage-${index}`}
                  className="px-2.5 py-1.5 bg-neutral-500 text-white rounded-sm"
                >
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id={`foodImage-${index}`}
                  placeholder="optional"
                  {...register(`foodOptions.${index}.foodImage`)}
                  className="file:hidden text-justify focus:outline-none"
                />
              </div>
            </div>
          </div>
        );
      })}
      {fields.length < 5 && (
        <div className="mt-8 flex justify-center font-body font-bold text-sm">
          <button
            onClick={onSubmit}
            className="transition ease-in-out duration-300 px-5 py-2.5 rounded-full bg-inherit ring-2 ring-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Add Another
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodOptions;
