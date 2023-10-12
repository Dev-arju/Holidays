import React, { useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import { BsFillPeopleFill } from "react-icons/bs";
import "react-calendar/dist/Calendar.css";

const PackageDateSelect = ({ item, states, setStates }) => {
  const { startDate, endsDate } = states;
  const { setStartDate, setEndsDate } = setStates;
  const currDate = new Date();
  const minDate = new Date(currDate);
  minDate.setDate(currDate.getDate() + 1);

  let year = useMemo(() => startDate && startDate.getFullYear(), [startDate]);
  let month = useMemo(() => {
    if (startDate) {
      let temp = startDate.getMonth() + 1;
      if (temp < 10) {
        return `0${temp}`;
      }
      return temp;
    }
  }, [startDate]);
  let date = useMemo(() => {
    if (startDate) {
      let temp = startDate.getDate();
      if (temp < 10) {
        return `0${temp}`;
      }
      return temp;
    }
  }, [startDate]);

  useEffect(() => {
    const temp = new Date(startDate);
    if (item) {
      temp.setDate(temp.getDate() + item.dayCount - 1);
      setEndsDate(
        `${temp.getFullYear()}-${
          temp.getMonth() + 1 < 10
            ? `0${temp.getMonth() + 1}`
            : temp.getMonth() + 1
        }-${temp.getDate() < 10 ? `0${temp.getDate()}` : temp.getDate()}`
      );
    }
  }, [startDate]);

  const tileClassName = ({ date }) => {
    if (date?.toLocaleDateString() === startDate?.toLocaleDateString()) {
      return "bg-primary text-white";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 font-body mt-4">
      <div className="col-span-1 md:col-span-2 text-center text-gray-600 leading-relaxed text-xl font-semibold mb-2">
        Choose Start Date
      </div>
      <div className="bg-bg-1/60 py-6 rounded-sm shadow-md flex justify-center items-center">
        <Calendar
          minDate={minDate}
          value={startDate}
          onChange={setStartDate}
          className="border-none rounded-lg shadow-lg"
          tileClassName={tileClassName}
          locale="en-US"
        />
      </div>
      <div className="bg-bg-1/60 py-4 rounded-sm shadow-md flex flex-col items-center justify-center">
        <h2 className="font-semibold text-[#999] text-xl">
          {item?.packageName}
        </h2>
        <p className="font-semibold text-[#999] p-2 border-b border-[#999]">
          <BsFillPeopleFill className="inline-block m-auto text-base me-2" />
          <span>2 Adults 0 Child</span>
        </p>
        <div className="grid grid-cols-2 items-center gap-2">
          <label
            htmlFor="depatureDate"
            className="border-r border-dashed border-[#999] pe-2"
          >
            Tour Start Date
          </label>
          <input
            type="date"
            value={startDate ? `${year}-${month}-${date}` : ""}
            className="focus:outline-none px-4 py-2 bg-inherit"
            id="depatureDate"
            readOnly
          />
          <div className="col-span-2 flex justify-center font-semibold text-sm text-[#999]">
            {`${item?.dayCount} Days ${item?.nightCount} Night`}
          </div>
          <label
            htmlFor="endsDate"
            className="border-r border-dashed border-[#999] pe-2"
          >
            Tour Ends Date
          </label>
          <input
            type="date"
            value={endsDate ? endsDate : ""}
            className="focus:outline-none px-4 py-2 bg-inherit"
            id="endsDate"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PackageDateSelect;
