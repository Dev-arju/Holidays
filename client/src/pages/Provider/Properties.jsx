import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { BsHouseAddFill } from "react-icons/bs";
import { MdPublishedWithChanges } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { putRequest, getRequest, setAccessToken } from "../../utils/axios";
import { toast } from "react-toastify";

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

const Properties = () => {
  const { authData } = useSelector((state) => state.provider);
  const [modal, setModal] = useState({ active: false, payload: "" });
  const [properties, setProperties] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const pagination = useRef(null);
  const totalPages = useMemo(() => {
    return Math.ceil(properties.length / 5);
  }, [properties.length]);

  useEffect(() => {
    const getAllProperties = async () => {
      setAccessToken(authData.token);
      const response = await getRequest("/provider/property");
      if (response.data) {
        setProperties(response.data);
      }
      if (response.error) {
        document.getElementById("isEmpty").classList.replace("hidden", "flex");
        console.log(response.error.message || response.message);
      }
    };
    getAllProperties();
  }, []);

  useEffect(() => {
    for (let i = 1; i <= totalPages; i++) {
      let child = document.createElement("p");
      child.onclick = pageClick;
      child.textContent = i;
      if (currPage === i) {
        child.className =
          "border-b w-6 text-center text-base font-bold cursor-pointer rounded-t-sm bg-neutral-100 shadow-inner border-black";
      } else {
        child.className =
          "border-b w-6 text-center text-base font-bold cursor-pointer border-gray-400";
      }
      pagination.current.appendChild(child);
    }
  }, [totalPages, currPage]);

  function pageClick(e) {
    e.stopPropagation();
    const pageNumber = parseInt(e.target.textContent);
    setCurrPage(pageNumber);
  }

  const statusChange = async (e) => {
    e.stopPropagation();
    const response = await putRequest(`/provider/property/${modal.payload}`);
    if (response.data) {
      setProperties((prev) => {
        return prev.map((property) => {
          if (property._id === modal.payload) {
            return { ...property, isAvailable: !property.isAvailable };
          }
          return property;
        });
      });
      toast.success("property status changed");
    }
    if (response.error) {
      console.log(response.error);
      toast.error(response.error.message || response.message);
    }

    setModal({ active: !modal.active, payload: "" });
  };

  return (
    <div>
      <div className="flex justify-between mx-4 px-4 py-2 items-center">
        <div className="font-tabs text-2xl">Your Properties Listed</div>
        <Link
          to="add"
          data-tooltip-id="addProperty"
          data-tooltip-content="List New Property"
          className="p-2 rounded-full bg-primary text-secondary text-2xl"
        >
          <BsHouseAddFill />
        </Link>
        <Tooltip style={TOOLTIP_STYLE} id="addProperty" place="bottom-start" />
      </div>
      <div className="mt-2 pt-2 overflow-x-auto">
        {properties.length > 0 ? (
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
              {properties.map((property, index) => {
                if ((currPage - 1) * 5 > index || currPage * 5 < index + 1) {
                  return;
                }
                return (
                  <tr className="border-b" key={property._id}>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {property.propertyName}
                    </td>
                    <td className="whitespace-nowrap font-normal px-6 py-4">
                      {property.propertyLocation}
                    </td>
                    <td
                      className={
                        property.isAvailable
                          ? "whitespace-nowrap font-normal text-green-800 px-6 py-4"
                          : "whitespace-nowrap font-normal text-red-800 px-6 py-4"
                      }
                    >
                      {property.isAvailable ? "available" : "unavailable"}
                    </td>
                    <td className="whitespace-nowrap font-normal px-6 py-4">
                      {property.priceOptions.length}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <Link to={`edit/${property._id}`}>
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
                      <MdPublishedWithChanges
                        className="text-lg text-blue-800 cursor-pointer availability focus:outline-none"
                        onClick={() =>
                          setModal({
                            active: !modal.active,
                            payload: property._id,
                          })
                        }
                      />
                      <Tooltip
                        style={TOOLTIP_STYLE}
                        place="bottom-end"
                        anchorSelect=".availability"
                        content="change property status"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div
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
          </div>
        )}
      </div>
      {properties.length > 0 && (
        <div className="flex justify-end items-center mr-8 mt-8">
          <p className="w-6 text-center text-base font-bold ">
            <BsFillCaretLeftFill
              onClick={() => currPage > 1 && setCurrPage(currPage - 1)}
              className="mx-auto cursor-pointer"
            />
          </p>
          <div className="flex items-center" ref={pagination}></div>
          <p className="w-6 text-center text-base font-bold ">
            <BsFillCaretRightFill
              onClick={() => currPage < totalPages && setCurrPage(currPage + 1)}
              className="mx-auto cursor-pointer"
            />
          </p>
        </div>
      )}
      {modal.active && (
        <div className="fixed top-0 left-0 lg:ml-28 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-8 py-4 rounded-md shadow-md">
            <p className="h-12 font-title">
              If you wish to change property status
            </p>
            <h1 className="text-center font-serif text-blue-900">
              Are you sure?
            </h1>
            <div className="flex justify-evenly items-center my-2">
              <button
                className="px-4 py-1 rounded-md border border-blue-600 font-bold text-blue-600 hover:bg-blue-500 hover:text-white"
                onClick={() => setModal({ active: !modal.active, payload: "" })}
              >
                No
              </button>
              <button
                className="px-4 py-1 rounded-md border border-red-500 font-bold text-red-500 hover:bg-red-500 hover:text-white"
                onClick={statusChange}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
