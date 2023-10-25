import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { FaEdit } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";

const TOOLTIP_STYLE = {
  paddingLeft: "8px",
  paddingRight: "8px",
  paddingTop: "2px",
  paddingBottom: "4px",
  fontSize: "12px",
  fontWeight: "500",
  backgroundColor: "rgb(250, 250, 250)",
  color: " rgb(30 64 175)",
};

const Bookings = () => {
  return (
    <>
      <div className="flex mx-4 px-4 py-2 items-center">
        <div className="font-tabs text-2xl">Package Bookings</div>
      </div>
      <div className="mt-2 pt-2 overflow-x-auto">
        <table className="min-w-full table-auto text-center text-sm font-light">
          <thead className="border-b bg-neutral-50 shadow-inner font-medium">
            <tr>
              <th scope="col" className="px-6 py-4">
                Property Name
              </th>
              <th scope="col" className="px-6 py-4">
                Location
              </th>
              <th scope="col" className="px-6 py-4">
                Booking Availability
              </th>
              <th scope="col" className="px-6 py-4">
                Price Plan Count
              </th>
              <th scope="col" className="px-6 py-4"></th>
              <th scope="col" className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                Lorem ipsum dolor sit amet.
              </td>
              <td className="whitespace-nowrap font-normal px-6 py-4">
                Lorem ipsum dolor sit amet.
              </td>
              <td
                className={
                  1 === 1
                    ? "whitespace-nowrap font-normal text-green-800 px-6 py-4"
                    : "whitespace-nowrap font-normal text-red-800 px-6 py-4"
                }
              >
                success
              </td>
              <td className="whitespace-nowrap font-normal px-6 py-4">
                Lorem ipsum dolor sit amet.
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                <Link to="#">
                  <FaEdit className="text-base cursor-pointer focus:outline-none view-form" />
                </Link>
                <Tooltip
                  style={TOOLTIP_STYLE}
                  place="bottom-end"
                  anchorSelect=".view-form"
                  content="view/edit details"
                />
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <MdPublishedWithChanges className="text-lg text-blue-800 cursor-pointer availability focus:outline-none" />
                <Tooltip
                  style={TOOLTIP_STYLE}
                  place="bottom-end"
                  anchorSelect=".availability"
                  content="change property status"
                />
              </td>
            </tr>
          </tbody>
        </table>
        {/* <div
            id="isEmpty"
            className="hidden w-full h-96 flex-col justify-center items-center bg-neutral-100 rounded-md shadow-md"
          >
            <h2 className="font-serif font-semibold text-2xl text-center text-primary">
              Properties Not Found
            </h2>
            <div className="flex justify-center items-center gap-4">
              <span className="text-sm font-title">
                if you wish to add new property
              </span>
              <Link
                to="/provider/properties/add"
                className="outline-none font-body text-primary "
              >
                Click here
              </Link>
            </div>
          </div> */}
      </div>
    </>
  );
};

export default Bookings;
