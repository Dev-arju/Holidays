import React, { useState } from "react";
import TravelOption from "./TravelOption";
import { toast } from "react-toastify";
import FoodOptions from "./FoodOptions";
import Stay from "./Stay";

const GeneralOptions = ({ setActiveComponent, form, lastDay }) => {
  const [toogleFood, setToogleFood] = useState(true);
  const [toggleTravelOption, setToggleTravelOption] = useState(false);
  const [stayToogle, setStayToggle] = useState(false);
  const { trigger, formState } = form;
  const { errors } = formState;
  const travelToggle = (e) => {
    setToggleTravelOption(true);
    setStayToggle(false);
    setToogleFood(false);
  };

  const stayToogleChange = (e) => {
    setStayToggle(true);
    setToggleTravelOption(false);
    setToogleFood(false);
  };
  const toogleFoodChange = () => {
    setToogleFood(true);
    setStayToggle(false);
    setToggleTravelOption(false);
  };

  const validateFoodOptions = () => {
    const err = errors.foodOptions;
    const messages = [];
    if (err) {
      err.forEach((err) => {
        for (let field in err) {
          messages.push(err[field].message);
        }
      });
    }
    if (messages.length > 0) {
      return messages;
    }
    return false;
  };

  const validate = (err) => {
    let messages = [];
    if (err !== undefined) {
      for (let field in err) {
        // console.log(err[field].message);
        messages.push(err[field].message);
      }
    }
    if (messages.length > 0) {
      return messages;
    }
    return false;
  };

  const nextPageHandler = async (e) => {
    e.stopPropagation();
    const stayErr = errors.accomodation;
    const travelErr = errors.travelling;
    const isValid = await trigger();

    if (!isValid) {
      const errFoodMessages = validateFoodOptions();
      const errTravelMessages = validate(travelErr);
      const errStayMessages = validate(stayErr);
      if (errTravelMessages) {
        errTravelMessages.forEach((err) => toast.error(err));
      }
      if (errFoodMessages) {
        errFoodMessages.forEach((err) => toast.error(err));
      }
      if (errStayMessages) {
        errStayMessages.forEach((err) => toast.error(err));
      }
    } else {
      setActiveComponent("activity");
    }
  };

  return (
    <>
      <div className="p-4 font-body font-semibold text-lg text-gray-600 mt-4 flex flex-wrap gap-1">
        <div
          onClick={toogleFoodChange}
          className={
            toogleFood
              ? "text-white px-5 py-2.5 bg-gray-800 transition ease-in duration-500 rounded-tl-lg cursor-pointer"
              : "text-blue-600 px-5 py-2.5 shadow-md border-r-2 border-gray-400 transition ease-out duration-500 cursor-pointer"
          }
        >
          Food Menu
        </div>
        {!lastDay && (
          <div
            onClick={stayToogleChange}
            className={
              stayToogle
                ? "text-white px-5 py-2.5 bg-gray-800 transition ease-in duration-500 rounded-tr-lg cursor-pointer"
                : "text-blue-600 px-5 py-2.5 shadow-md border-r-2 border-gray-400 transition ease-out duration-500 cursor-pointer"
            }
          >
            Accomodation
          </div>
        )}
        <div
          onClick={travelToggle}
          className={
            toggleTravelOption
              ? "text-white px-5 py-2.5 bg-gray-800 transition ease-in duration-500 rounded-tr-lg cursor-pointer"
              : "text-blue-600 px-5 py-2.5 shadow-md border-r-2 border-gray-400 transition ease-out duration-500 cursor-pointer"
          }
        >
          Travelling
        </div>
        <div className="flex-grow self-center font-medium ">
          <button
            onClick={nextPageHandler}
            className="float-right px-5 py-2.5 bg-sky-600 text-white rounded-r-full rounded-l-md shadow-sm transform hover:translate-x-1 hover:shadow-lg duration-200"
          >
            validate
          </button>
        </div>
      </div>
      <FoodOptions form={form} toggle={toogleFood} />
      {!lastDay && <Stay form={form} toggle={stayToogle} />}
      <TravelOption form={form} toggle={toggleTravelOption} />
    </>
  );
};

export default GeneralOptions;
