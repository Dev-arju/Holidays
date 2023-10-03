import React, { useState, useEffect, useMemo, useRef } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { MdPublishedWithChanges } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { getRequest, setAccessToken } from "../../utils/axios";

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
  const [modal, setModal] = useState({ active: false, payload: "" });
  const [isLoaded, setIsLoaded] = useState(false);
  const [packages, setPackages] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const pagination = useRef(null);
  const { authData } = useSelector((state) => state.provider);
  const { token } = authData;
  const totalPages = useMemo(() => {
    return Math.ceil(packages.length / 5);
  }, [packages]);

  useEffect(() => {
    const getPackages = async () => {
      setAccessToken(token);
      const { data, error, message } = await getRequest("/provider/packages");
      if (data) {
        setPackages([...data]);
        setIsLoaded(true);
      }
      if (error) {
        setIsLoaded(true);
        console.log(error.message || message);
        toast.error("problem while fetch data");
      }
    };
    getPackages();
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

  return (
    <div>
      <div className="flex justify-between mx-4 px-4 py-2 items-center">
        <div className="font-tabs text-2xl">Packages Listed</div>
        <Link
          to="add"
          data-tooltip-id="addPackage"
          data-tooltip-content="Add new package"
          className="p-2 rounded-full bg-primary text-secondary text-2xl"
        >
          <HiViewGridAdd />
        </Link>
        <Tooltip style={TOOLTIP_STYLE} id="addPackage" place="bottom-start" />
      </div>
      {isLoaded && (
        <div className="mt-2 pt-2 overflow-x-auto">
          {packages.length > 0 ? (
            <table className="min-w-full table-auto text-center text-sm font-light">
              <thead className="border-b bg-neutral-50 shadow-inner font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Package Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    No. of Days
                  </th>
                  <th scope="col" className="px-6 py-4">
                    No. of Activities
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {packages.map((doc, index) => {
                  if ((currPage - 1) * 5 > index || currPage * 5 < index + 1) {
                    return;
                  }
                  return (
                    <tr className="border-b" key={doc._id}>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {doc.packageName}
                      </td>
                      <td className="whitespace-nowrap font-normal px-6 py-4">
                        {doc.dayCount}
                      </td>
                      <td className="whitespace-nowrap font-normal px-6 py-4">
                        {doc.dailySchedules.reduce((acc, day) => {
                          return acc + day.activity.length;
                        }, 0)}
                      </td>
                      <td
                        className={
                          doc.isAvailable
                            ? "whitespace-nowrap font-normal text-green-800 px-6 py-4"
                            : "whitespace-nowrap font-normal text-red-800 px-6 py-4"
                        }
                      >
                        {doc.isAvailable ? "active" : "inActive"}
                      </td>
                      <td className="whitespace-nowrap font-normal px-6 py-4">
                        &#8377; {doc.price.toLocaleString("en-IN")}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <Link to={`edit/${doc._id}`}>
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
                          className="text-lg text-blue-800 cursor-pointer status-change focus:outline-none"
                          onClick={() =>
                            setModal({
                              active: !modal.active,
                              payload: doc._id,
                            })
                          }
                        />
                        <Tooltip
                          style={TOOLTIP_STYLE}
                          place="bottom-end"
                          anchorSelect=".status-change"
                          content="change package status"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-96 flex flex-col justify-center items-center bg-neutral-100 rounded-md shadow-md">
              <h2 className="font-serif font-semibold text-2xl text-center text-primary">
                Packages Not Found
              </h2>
              <div className="flex justify-center items-center gap-4">
                <span className="text-sm font-title">
                  if you wish to add new package
                </span>
                <Link
                  to="/provider/packages/add"
                  className="outline-none font-body text-primary "
                >
                  Click here
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      {packages.length > 0 && isLoaded && (
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
              If you wish to change package status
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
              <button className="px-4 py-1 rounded-md border border-red-500 font-bold text-red-500 hover:bg-red-500 hover:text-white">
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
