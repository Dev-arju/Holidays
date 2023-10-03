import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { BsSave2 } from "react-icons/bs";
import { toast } from "react-toastify";
import { MdDeleteSweep } from "react-icons/md";
import { postRequest, setAccessToken } from "../../utils/axios";

const PriceOption = () => {
  const { authData } = useSelector((state) => state.provider);
  const [planName, setPlanName] = useState("");
  const [adultsAllowed, setAdultsAllowed] = useState("");
  const [childAllowed, setChildAllowed] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planOptions, setPlanOptions] = useState([]);
  const { docId } = useParams();
  const navigate = useNavigate();
  const verifyIntegerInput = (data) => /^\d{1,2}$/.test(data);
  const verifyPriceInput = (data) => /^[0-9]+(?:\.[0-9]{2})?$/.test(data);

  const savePriceOption = (e) => {
    e.stopPropagation();
    if (!planName || !adultsAllowed || !childAllowed || !planPrice) {
      return toast.error("please fill all details");
    }
    if (
      !verifyIntegerInput(adultsAllowed) ||
      !verifyIntegerInput(childAllowed) ||
      !verifyPriceInput(planPrice)
    ) {
      return toast.error("Invalid characters");
    }
    const newOption = {
      planName,
      adultsAllowed,
      childAllowed,
      planPrice,
    };
    setPlanOptions((prev) => {
      return [...prev, newOption];
    });
    setPlanName("");
    setAdultsAllowed("");
    setChildAllowed("");
    setPlanPrice("");
  };

  const deleteHandler = (e, index) => {
    e.stopPropagation();
    setPlanOptions((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  const handleChange = ({ target }) => {
    switch (target.id) {
      case "planName": {
        setPlanName(target.value);
        if (target.value === "" || target.value === " ") {
          if (target.classList.contains("ring-green-500")) {
            target.classList.replace("ring-green-500", "ring-red-500");
            target.classList.replace(
              "focus:ring-green-600",
              "focus:ring-red-600"
            );
          }
          target.classList.replace("ring-gray-500", "ring-red-500");
          target.classList.replace("focus:ring-sky-600", "focus:ring-red-600");
        } else {
          if (target.classList.contains("ring-gray-500")) {
            target.classList.replace("ring-gray-500", "ring-green-500");
            target.classList.replace(
              "focus:ring-sky-600",
              "focus:ring-green-600"
            );
          }
          target.classList.replace("ring-red-500", "ring-green-500");
          target.classList.replace(
            "focus:ring-red-600",
            "focus:ring-green-600"
          );
        }
        break;
      }
      case "adultsAllowed": {
        setAdultsAllowed(target.value);
        if (!verifyIntegerInput(target.value)) {
          if (target.classList.contains("ring-green-500")) {
            target.classList.replace("ring-green-500", "ring-red-500");
            target.classList.replace(
              "focus:ring-green-600",
              "focus:ring-red-600"
            );
          }
          target.classList.replace("ring-gray-500", "ring-red-500");
          target.classList.replace("focus:ring-sky-600", "focus:ring-red-600");
        } else {
          if (target.classList.contains("ring-gray-500")) {
            target.classList.replace("ring-gray-500", "ring-green-500");
            target.classList.replace(
              "focus:ring-sky-600",
              "focus:ring-green-600"
            );
          }
          target.classList.replace("ring-red-500", "ring-green-500");
          target.classList.replace(
            "focus:ring-red-600",
            "focus:ring-green-600"
          );
        }
        break;
      }
      case "childAllowed": {
        setChildAllowed(target.value);
        if (!verifyIntegerInput(target.value)) {
          if (target.classList.contains("ring-green-500")) {
            target.classList.replace("ring-green-500", "ring-red-500");
            target.classList.replace(
              "focus:ring-green-600",
              "focus:ring-red-600"
            );
          }
          target.classList.replace("ring-gray-500", "ring-red-500");
          target.classList.replace("focus:ring-sky-600", "focus:ring-red-600");
        } else {
          if (target.classList.contains("ring-gray-500")) {
            target.classList.replace("ring-gray-500", "ring-green-500");
            target.classList.replace(
              "focus:ring-sky-600",
              "focus:ring-green-600"
            );
          }
          target.classList.replace("ring-red-500", "ring-green-500");
          target.classList.replace(
            "focus:ring-red-600",
            "focus:ring-green-600"
          );
        }
        break;
      }
      case "price": {
        setPlanPrice(target.value);
        if (!verifyPriceInput(target.value)) {
          if (target.classList.contains("ring-green-500")) {
            target.classList.replace("ring-green-500", "ring-red-500");
            target.classList.replace(
              "focus:ring-green-600",
              "focus:ring-red-600"
            );
          }
          target.classList.replace("ring-gray-500", "ring-red-500");
          target.classList.replace("focus:ring-sky-600", "focus:ring-red-600");
        } else {
          if (target.classList.contains("ring-gray-500")) {
            target.classList.replace("ring-gray-500", "ring-green-500");
            target.classList.replace(
              "focus:ring-sky-600",
              "focus:ring-green-600"
            );
          }
          target.classList.replace("ring-red-500", "ring-green-500");
          target.classList.replace(
            "focus:ring-red-600",
            "focus:ring-green-600"
          );
        }
        break;
      }
      default:
        return;
    }
  };

  const handleFinish = async (e) => {
    e.stopPropagation();
    if (planOptions.length < 1) {
      return toast.error("add minimum one price plan");
    }
    setAccessToken(authData.token);
    const response = await postRequest(`/provider/property/add/${docId}`, {
      planOptions,
    });
    if (response.data || response.status === 200) {
      toast.success("added new property");
      navigate("/provider/properties");
    }
    if (response.error) {
      console.log(response.error);
      toast.error(response.error.message || response.message);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <h2 className="text-center font-body leading-tight font-bold text-2xl">
          Add Pricing Plans
        </h2>
      </div>

      <div className="bg-neutral-50 shadow-lg flex flex-wrap justify-center gap-3 p-4  rounded-lg">
        <div className="relative bg-inherit">
          <input
            type="text"
            id="planName"
            value={planName}
            onChange={handleChange}
            className="peer bg-transparent h-8  rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none"
            placeholder="Plan Name"
          />
          <label
            htmlFor="planName"
            className="absolute cursor-text left-0  -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Plan Name
          </label>
        </div>
        <div className="relative bg-inherit">
          <input
            type="text"
            id="adultsAllowed"
            value={adultsAllowed}
            onChange={handleChange}
            className="peer bg-transparent h-8 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none"
            placeholder="Adults Allowed"
          />
          <label
            htmlFor="adultsAllowed"
            className="absolute cursor-text left-0 -top-3 text-sm text-gray-600 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Adults Allowed
          </label>
        </div>

        <div className="relative bg-inherit">
          <input
            type="text"
            id="childAllowed"
            value={childAllowed}
            onChange={handleChange}
            className="peer bg-transparent h-8 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
            placeholder="Child Allowed"
          />
          <label
            htmlFor="childAllowed"
            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Child Allowed
          </label>
        </div>

        <div className="relative bg-inherit">
          <input
            type="text"
            id="price"
            value={planPrice}
            onChange={handleChange}
            className="peer bg-transparent h-8 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none "
            placeholder="Price"
          />
          <label
            htmlFor="price"
            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Price
          </label>
        </div>
        <div className="mt-2">
          <button
            type="button"
            onClick={savePriceOption}
            className="font-mono text-sm text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-1.5 text-center"
          >
            save
            <BsSave2 className="inline-block ms-2" />
          </button>
        </div>
      </div>
      <div className="mt-6">
        <div className="font-tabs text-lg text-green-900 ps-8 mb-2">
          Saved Price Options
        </div>
        <table className="min-w-full table-auto text-center text-sm font-light">
          <thead className="border-b bg-neutral-50 shadow-inner font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" className="col-span-4 px-6 py-4">
                Plan Name
              </th>
              <th scope="col" className="col-span-2 px-6 py-4">
                Adults Allowed
              </th>
              <th scope="col" className="col-span-2 px-6 py-4">
                childAllowed
              </th>
              <th scope="col" className="col-span-2 px-6 py-4">
                Price
              </th>
              <th scope="col" className="col-span-1 px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {planOptions.length > 0 &&
              planOptions.map((option, index) => {
                return (
                  <tr className="border-b dark:border-neutral-500" key={index}>
                    <td className="whitespace-nowrap col-span-8  px-6 py-4 font-medium">
                      {option.planName}
                    </td>
                    <td className="whitespace-nowrap col-span-2  px-6 py-4">
                      {option.adultsAllowed}
                    </td>
                    <td className="whitespace-nowrap col-span-2 px-6 py-4">
                      {option.childAllowed}
                    </td>
                    <td className="whitespace-nowrap col-span-2 px-6 py-4">
                      {option.planPrice}
                    </td>

                    <td className="whitespace-nowrap  col-span-1 px-6 py-4">
                      <button
                        className="text-red-800"
                        onClick={(e) => deleteHandler(e, index)}
                      >
                        <MdDeleteSweep className="text-base" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="mt-16 flex justify-center">
        <button
          type="button"
          onClick={handleFinish}
          className="text-white cursor-pointer bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Finish & Save
        </button>
      </div>
    </div>
  );
};

export default PriceOption;
