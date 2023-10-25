import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdPublishedWithChanges } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { setAccessToken, getRequest, putRequest } from "../../utils/axios";
import { toast } from "react-toastify";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { FaFileDownload } from "react-icons/fa";
import { FcAcceptDatabase } from "react-icons/fc";
import { CiViewList } from "react-icons/ci";
import { GrFormClose } from "react-icons/gr";
import Invoice from "../../components/Invoice";
import { usePDF } from "react-to-pdf";
// import generatePDF from "react-to-pdf";

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
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  // const invoiceRef = useRef(null);
  const { authData } = useSelector((state) => state.admin);
  //   const [modal, setModal] = useState({ active: false, payload: "" });
  const [singleView, setSingleView] = useState({ show: false });
  const [Bookings, setBookings] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const pagination = useRef(null);
  const totalPages = useMemo(() => {
    return Math.ceil(Bookings.length / 5);
  }, [Bookings.length]);

  const fetchBookings = async () => {
    setAccessToken(authData.token);
    const { data, error } = await getRequest("/admin/Bookings");
    if (data) {
      console.log(data);
      setBookings(data);
    }
    if (error) {
      document.getElementById("isEmpty").classList.replace("hidden", "flex");
      toast.error(error.message);
      console.log(error.message || message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // useEffect(() => {
  //   if (singleView.active) {
  //     console.log(targetRef?.current);
  //     toPDF();
  //     // generatePDF(invoiceRef, { filename: "invoice.pdf" });
  //     setSingleView({ show: false, active: false });
  //   }
  // }, [singleView.active]);

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

  function pageClick(e) {
    e.stopPropagation();
    const pageNumber = parseInt(e.target.textContent);
    setCurrPage(pageNumber);
  }

  const showSingleBooking = async (id) => {
    try {
      const doc = Bookings.filter((obj) => obj._id === id && obj);
      setSingleView({ show: true, doc: doc[0] });
      console.log(doc);
    } catch (error) {
      console.log(error);
    }
  };

  const savePdf = async (id) => {
    let booking = Bookings.filter((obj) => obj._id === id);
    booking = booking[0];
    console.log(booking);
    // setSingleView({ show: true, active: true, doc: booking });
    // generatePDF(invoiceRef, { filename: "invoice.pdf" });
  };

  //   const statusChange = async (e) => {
  //     e.stopPropagation();
  //     console.log(modal);
  //     const { data, error } = await putRequest("/admin/Bookings/status-toggle", {
  //       providerId: modal.payload,
  //     });
  //     if (data) {
  //       setBookings((prev) => {
  //         return prev.map((doc) => {
  //           if (doc._id === data._id) {
  //             return data;
  //           }
  //           return doc;
  //         });
  //       });
  //     }
  //     if (error) {
  //       console.log(error.message);
  //       toast.error(error.message);
  //     }
  //     setModal({ active: false, payload: "" });
  //   };

  return (
    <>
      <div className="flex justify-between mx-4 px-4 mb-4 items-center">
        <div className="font-body font-bold text-2xl">Bookings</div>
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
        {Bookings.length > 0 ? (
          <table className="min-w-full  table-auto text-center text-sm font-light">
            <thead className="border-b bg-neutral-50 shadow-inner font-medium">
              <tr>
                <th scope="col" className="px-2 py-4">
                  Booking Id
                </th>
                <th scope="col" className="px-6 py-4">
                  User
                </th>
                <th scope="col" className="px-6 py-4">
                  Item
                </th>
                <th scope="col" className="px-6 py-4">
                  Amount
                </th>

                <th scope="col" className="px-6 py-4">
                  Booking Status
                </th>
                <th scope="col" className=" py-4"></th>
                <th scope="col" className=" py-4"></th>
                <th scope="col" className=" py-4"></th>
              </tr>
            </thead>
            <tbody>
              {Bookings.map((doc, index) => {
                if ((currPage - 1) * 5 > index || currPage * 5 < index + 1) {
                  return;
                }
                return (
                  <tr className="border-b" key={doc._id}>
                    <td className="whitespace-nowrap px-4 py-4 font-medium">
                      {doc._id}
                    </td>
                    <td className="whitespace-nowrap font-normal px-4 py-4">
                      {doc.userId.name}
                    </td>
                    <td className="whitespace-nowrap font-normal px-4 py-4">
                      {doc.packageId.packageName}
                    </td>
                    <td className="whitespace-nowrap font-normal px-4 py-4">
                      {doc.packageId.price}
                    </td>
                    <td
                      className={
                        doc.status !== "cancelled"
                          ? "whitespace-nowrap font-normal text-green-800 px-6 py-4"
                          : "whitespace-nowrap font-normal text-red-800 px-6 py-4"
                      }
                    >
                      {doc.status}
                    </td>

                    <td className="whitespace-nowrap py-4">
                      {/* <Link to={`/admin/bookings/${doc._id}`}> */}
                      <CiViewList
                        onClick={() => showSingleBooking(doc._id)}
                        className="text-base cursor-pointer focus:outline-none view-form"
                      />
                      {/* </Link> */}
                      <Tooltip
                        style={TOOLTIP_STYLE}
                        place="bottom-end"
                        anchorSelect=".view-form"
                        content="view details"
                      />
                    </td>
                    <td className="whitespace-nowrap p-4">
                      <FaFileDownload
                        onClick={() => savePdf(doc._id)}
                        id="save-pdf"
                        className="text-primary focus:outline-none cursor-pointer"
                      />
                      <Tooltip
                        style={TOOLTIP_STYLE}
                        place="bottom-end"
                        anchorSelect="#save-pdf"
                        content="save invoice"
                      />
                    </td>
                    <td className="whitespace-nowrap p-4">
                      <FcCancel
                        className={
                          !doc.cancelled
                            ? "text-lg text-red-600 cursor-pointer availability  focus:outline-none"
                            : "text-lg text-red-60 opacity-40 cursor-pointer availability focus:outline-none"
                        }
                        // onClick={() =>
                        //   setModal({
                        //     active: !modal.active,
                        //     payload: doc._id,
                        //   })
                        // }
                      />
                      {!doc.cancelled && (
                        <Tooltip
                          style={TOOLTIP_STYLE}
                          place="bottom-end"
                          anchorSelect=".availability"
                          content="cancel"
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
            className="hidden w-full h-96 flex-col justify-center items-center bg-neutral-100 rounded-md shadow-md"
          >
            <h2 className="font-serif font-semibold text-2xl text-center text-primary">
              Bookings Not Found
            </h2>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={fetchBookings}
                className="outline-none mt-2 font-tabs text-blue-600 hover:underline "
              >
                refresh
              </button>
            </div>
          </div>
        )}
      </div>
      {Bookings.length > 0 && (
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
      {/* {modal.active && (
        <div className="fixed top-0 left-0 lg:ml-28 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-8 py-4 rounded-md shadow-md">
            <p className="h-12 font-title">Confirm to change doc status</p>
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
      )} */}
      {singleView.show && (
        <div
          onClick={() => setSingleView({ show: false })}
          style={singleView?.active && { visibility: "hidden" }}
          className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-200 overflow-auto"
        >
          <div className="absolute left-1/2 cursor-pointer -translate-x-1/2 bottom-4  p-2.5 bg-red-200 rounded-full shadow-lg">
            <GrFormClose className="text-2xl" />
          </div>
          <Invoice doc={singleView?.doc} ref={targetRef} />
        </div>
      )}
    </>
  );
};

export default Bookings;
