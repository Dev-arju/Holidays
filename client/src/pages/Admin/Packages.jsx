import React, { useState, useRef, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { getRequest, putRequest, setAccessToken } from "../../utils/axios";
import { Tooltip } from "react-tooltip";
import { MdPublishedWithChanges } from "react-icons/md";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
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

const Packages = () => {
  const { authData } = useSelector((state) => state.admin);
  const { token } = authData;
  const [packages, setPackages] = useState([]);
  const [modal, setModal] = useState({ active: false, payload: null });
  const [currPage, setCurrPage] = useState(1);
  const pagination = useRef(null);
  const totalPages = useMemo(() => {
    return Math.ceil(packages.length / 5);
  }, [packages.length]);

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (pagination.current) pagination.current.innerHTML = "";
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
    return () => {
      window.removeEventListener("click", pageClick);
    };
  }, [totalPages, currPage]);

  const bannerCheckHandler = async (elem, id) => {
    setAccessToken(token);
    const { data, error } = await putRequest("/admin/banner/set", {
      packageId: id,
      status: elem.checked,
    });
    if (data.acknowledged) {
      setPackages((prev) => {
        return prev.map((doc) => {
          if (doc._id === id) {
            doc.banner = !doc.banner;
          }
          return doc;
        });
      });
      toast.success("banner options updated");
    }
    if (error) {
      elem.checked = false;
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const statusChange = async (e) => {
    e.stopPropagation();
    setAccessToken(token);
    const { data, error } = await putRequest("/admin/package/availability", {
      packageId: modal.payload,
    });
    if (data) {
      setPackages((prev) => {
        return prev.map((doc) => {
          if (doc._id === data._id) {
            doc.isAvailable = data.isAvailable;
          }
          return doc;
        });
      });
      toast.success("Availability status changed");
    }
    if (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    setModal((prev) => ({ active: !prev.active, payload: "" }));
  };

  function pageClick(e) {
    e.stopPropagation();
    const pageNumber = parseInt(e.target.textContent);
    setCurrPage(pageNumber);
  }

  async function fetchPackages() {
    const { data, error } = await getRequest("/users/packages");
    if (data) {
      setPackages(data);
    }
    if (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  }

  return (
    <>
      <div className="flex justify-between mx-4 px-4 mb-4 items-center">
        <div className="font-body font-bold text-2xl">Packages</div>
        {/* <Link
          to="#"
          data-tooltip-id="a"
          data-tooltip-content="Pending Requests"
          className="p-2 rounded-full bg-neutral-200 shadow-lg text-2xl"
        >
          <FcAcceptDatabase />
        </Link>
        <Tooltip style={TOOLTIP_STYLE} id="a" place="bottom-start" /> */}
      </div>
      <div className="mt-2 overflow-x-auto">
        {packages.length > 0 ? (
          <table className="min-w-full  table-auto text-center text-sm font-light">
            <thead className="border-b bg-neutral-50 shadow-inner font-medium">
              <tr>
                <th scope="col" className="px-2 py-4">
                  Package Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Duration
                </th>
                <th scope="col" className="px-6 py-4">
                  Seller
                </th>
                <th scope="col" className="px-6 py-4">
                  Amount
                </th>

                <th scope="col" className="px-6 py-4">
                  Booking Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Banner
                </th>
                <th scope="col" className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {packages.map((doc, index) => {
                if ((currPage - 1) * 5 > index || currPage * 5 < index + 1) {
                  return;
                }
                return (
                  <tr className="border-b hover:bg-gray-200" key={doc._id}>
                    <td className="whitespace-nowrap px-4 py-4 font-medium">
                      {doc.packageName}
                    </td>
                    <td className="whitespace-nowrap font-normal px-4 py-4">
                      {`${doc.dayCount} Day ${doc.nightCount} Night`}
                    </td>
                    <td className="whitespace-nowrap font-normal px-4 py-4">
                      {doc.provider.brandName}
                    </td>
                    <td className="whitespace-nowrap font-normal px-4 py-4">
                      {doc.price}
                    </td>
                    <td
                      className={
                        doc.isAvailable
                          ? "whitespace-nowrap font-normal text-green-800 px-6 py-4"
                          : "whitespace-nowrap font-normal text-red-800 px-6 py-4"
                      }
                    >
                      {doc.isAvailable ? "active" : "in active"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="checkbox"
                        checked={doc.banner}
                        onChange={(e) => bannerCheckHandler(e.target, doc._id)}
                        className="banner-select"
                      />

                      <Tooltip
                        style={TOOLTIP_STYLE}
                        place="bottom-end"
                        anchorSelect=".banner-select"
                        content="set as banner"
                      />
                    </td>

                    <td className="whitespace-nowrap p-4">
                      <MdPublishedWithChanges
                        className={
                          doc.isAvailable
                            ? "text-lg text-red-600 cursor-pointer availability  focus:outline-none"
                            : "text-lg text-green-900 cursor-pointer availability focus:outline-none"
                        }
                        onClick={() =>
                          setModal({
                            active: !modal.active,
                            payload: doc._id,
                          })
                        }
                      />
                      {!doc.cancelled && (
                        <Tooltip
                          style={TOOLTIP_STYLE}
                          place="bottom-end"
                          anchorSelect=".availability"
                          content="change status"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div
            id="isEmpty"
            className="w-full h-96 flex flex-col justify-center items-center bg-neutral-100 rounded-md shadow-md"
          >
            <h2 className="font-serif font-semibold text-2xl text-center text-primary">
              Packages Not Found
            </h2>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={fetchPackages}
                className="outline-none mt-2 font-tabs text-blue-600 hover:underline "
              >
                refresh
              </button>
            </div>
          </div>
        )}
      </div>
      {packages.length > 0 && (
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
              Confirm to change Package Availability
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
    </>
  );
};

export default Packages;
