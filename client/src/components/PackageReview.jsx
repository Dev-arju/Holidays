import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdCloudyNight } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiMinusBold } from "react-icons/pi";

const PackageReview = ({ item, startDate }) => {
  const [toggleTourPlan, setToggleTourPlan] = useState(true);
  const [toggleActivities, setToggleActivities] = useState(false);
  const [toggleGeneralInfo, setToggleGeneralInfo] = useState(false);

  return (
    <div className="font-body mt-4">
      <h2 className="text-center text-gray-600 leading-relaxed text-xl font-semibold mb-2">
        review
      </h2>
      <div className="tour-plan">
        <div className="relative text-md font-medium text-white bg-neutral-400 py-2 px-4">
          <p>Accomodation Details</p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <input
              type="checkbox"
              id="tourPlan"
              className="hidden"
              onChange={(e) => setToggleTourPlan(e.target.checked)}
            />

            {toggleTourPlan ? (
              <label
                htmlFor="tourPlan"
                className="block cursor-pointer text-2xl"
              >
                <PiMinusBold />
              </label>
            ) : (
              <label
                htmlFor="tourPlan"
                className="block cursor-pointer text-2xl"
              >
                <IoMdAdd />
              </label>
            )}
          </div>
        </div>
        {toggleTourPlan &&
          item?.dailySchedules.map((day, index) => {
            if (day.accomodation.name !== "") {
              let checkInDate = startDate?.getDate();
              let checkOutDate = new Date(startDate);
              checkOutDate.setDate(checkOutDate.getDate() + 1);
              let checkInMonth = startDate?.toLocaleString("en-US", {
                month: "short",
              });
              let checkOutMonth = checkOutDate.toLocaleDateString("en-US", {
                month: "short",
              });

              return (
                <div
                  key={new Date(`${index}-10-2022`)}
                  className="relative font-body text-black p-4"
                >
                  <span className="absolute top-2 left-0 px-2.5 py-1 rounded-r-full bg-[#fff9f9] text-[10px] text-[#666] shadow-[2px_2px_2px_#d4d4d4]">
                    {`HOTEL #${index + 1}`}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-4 py-2 border-b border-dashed border-[#999]">
                    <div className="flex gap-2 justify-around items-center ">
                      <div className="w-24">
                        <p className="text-[10px] text-[#999] font-bold">
                          Check-in
                        </p>
                        <div className="border border-[#999] rounded-lg overflow-hidden">
                          <p className="text-center text-white bg-[#999] px-6 py-1">
                            {startDate?.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </p>
                          <p className="text-center mt-4 text-[24px] leading-tight font-bold">
                            {checkInDate}
                          </p>
                          <p className="text-center mb-4 text-lg leading-none font-medium">
                            {checkInMonth}
                          </p>
                        </div>
                      </div>
                      <div className="min-w-max text-center">
                        <IoMdCloudyNight className="mx-auto text-[24px]" />
                      </div>
                      <div className="w-24">
                        <p className="text-[10px] text-[#999] font-bold">
                          Check-out
                        </p>
                        <div className="border border-[#999] rounded-lg overflow-hidden">
                          <p className="text-center text-white bg-[#999] px-6 py-1">
                            {checkOutDate?.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </p>
                          <p className="text-center mt-4 text-[24px] leading-tight font-bold">
                            {checkOutDate?.getDate()}
                          </p>
                          <p className="text-center mb-4 text-lg leading-none font-medium">
                            {checkOutMonth}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="font-body flex flex-col justify-center">
                      <h5 className="font-medium text-sm text-[#999] mb-1">
                        {day.accomodation.location}
                      </h5>
                      <h6 className="font-semibold text-lg leading-tight">
                        {day.accomodation.name}
                      </h6>
                      <p className="font-medium text-xs">
                        <span className="text-[#999]">type: </span>
                        {day.accomodation.type}
                      </p>
                      <p className="font-medium text-[#999] text-sm mt-1.5">
                        <BsFillPeopleFill className="inline-block me-2" />
                        <span className="text-black text-xs">
                          {`${item.adults} Adults | ${item.children} Child`}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            return;
          })}
      </div>
      <div className="activities mt-2">
        <div className="relative text-md font-medium text-white bg-neutral-400 py-2 px-4">
          <p>itineraries</p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <input
              type="checkbox"
              id="activities"
              className="hidden"
              onChange={(e) => setToggleActivities(e.target.checked)}
            />

            {toggleActivities ? (
              <label
                htmlFor="activities"
                className="block cursor-pointer text-2xl"
              >
                <PiMinusBold />
              </label>
            ) : (
              <label
                htmlFor="activities"
                className="block cursor-pointer text-2xl"
              >
                <IoMdAdd />
              </label>
            )}
          </div>
        </div>
        {toggleActivities &&
          item?.dailySchedules.map((day, index) => {
            return (
              <div
                key={new Date(`${index}-10-2000`)}
                className="grid grid-cols-[80px_minmax(auto,_1fr)] gap-2.5 pt-4 border-b"
              >
                <div className="flex justify-center">
                  <div className="border border-[#999] h-fit rounded-lg px-6 py-3">
                    <h2 className="text-center font-medium font-body text-sm">
                      DAY
                    </h2>
                    <h4 className="text-center font-medium font-body text-2xl">
                      {index + 1}
                    </h4>
                  </div>
                </div>
                <div className="font-body">
                  <div className="mb-2 py-1 border-b border-dashed border-[#999]">
                    <p className="font-semibold text-xl  text-[#999]">
                      Activities on Day
                    </p>
                    <dl className="text-sm font-normal ps-4">
                      {day.activity.map((act) => {
                        return (
                          <li key={act.location + Date.now()}>{act.type}</li>
                        );
                      })}
                    </dl>
                  </div>
                  <div className="mb-2 py-1 border-b border-dashed border-[#999]">
                    <h2 className="font-semibold text-lg text-[#999]">
                      Meals Options
                    </h2>
                    <dl className="ps-4 font-normal text-sm">
                      {day.foodOptions.map((food) => {
                        return (
                          <li key={Date.now()}>
                            {food.type}
                            <span className="ms-2">{food.food}</span>
                          </li>
                        );
                      })}
                    </dl>
                  </div>
                  <div className="mb-2 py-1 ">
                    <h2 className="font-semibold text-lg text-[#999]">
                      Travelling
                    </h2>
                    <ul className="ps-4 font-normal text-sm ">
                      <li>
                        vehicle type:{" "}
                        <span className="ms-2 ">
                          {day.travelling.vehicleType}
                        </span>
                      </li>
                      <li>
                        vehicle modal:{" "}
                        <span className="ms-2">{day.travelling.modelName}</span>
                      </li>
                      <li>
                        seats availability:{" "}
                        <span className="ms-2 ">{day.travelling.seats}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="general-info mt-2">
        <div className="relative text-md font-medium text-white bg-neutral-400 py-2 px-4">
          <p>General Info</p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <input
              type="checkbox"
              id="generalInfo"
              className="hidden"
              onChange={(e) => setToggleGeneralInfo(e.target.checked)}
            />

            {toggleGeneralInfo ? (
              <label
                htmlFor="generalInfo"
                className="block cursor-pointer text-2xl"
              >
                <PiMinusBold />
              </label>
            ) : (
              <label
                htmlFor="generalInfo"
                className="block cursor-pointer text-2xl"
              >
                <IoMdAdd />
              </label>
            )}
          </div>
        </div>
        {toggleGeneralInfo && (
          <div className="font-body ps-4">
            <h2 className="text-[24px] text-[#999] leading-loose">
              {item?.packageName}
            </h2>
            <h2 className="text-sm font-medium">
              seller: <span className="ms-1">{item?.provider.brandName}</span>
            </h2>
            <h2 className="font-medium text-sm">
              package duration:{" "}
              <span className="ms-1">{`${item?.dayCount} Days | ${item?.nightCount} Night`}</span>
            </h2>
            <h2 className="font-medium text-sm">
              price:{" "}
              <span className="ms-1 text-lg">
                {item.price.toLocaleString()}
              </span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageReview;
