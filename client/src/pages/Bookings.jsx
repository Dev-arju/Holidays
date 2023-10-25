import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiRupee } from "react-icons/bi";
import Navbar from "../components/Navbar";
import { getRequest, setAccessToken } from "../utils/axios";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState(false);
  const [pastBookings, setPastBookings] = useState(false);
  const { authData } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      setAccessToken(authData.token);
      const { data, error } = await getRequest("/users/bookings");
      if (data) {
        data.forEach((doc) => {
          if (doc.status === "booked") {
            setActiveBookings(true);
          }
          if (doc.status === "completed") {
            setPastBookings(true);
          }
        });
        setBookings(data);
      }
      if (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  }, []);
  console.log(bookings);

  return (
    <div className="relative w-full min-h-screen pt-12 bg-bg-1/60 pb-24">
      <Navbar />
      <ToastContainer />
      {activeBookings && (
        <div className="bg-white mx-2 md:mx-8 mt-4 rounded shadow-lg py-4">
          <p className="font-body font-semibold text-lg text-gray-500  px-8 border-b border-dashed border-gray-500">
            Active Bookings
          </p>

          {bookings.length > 0 &&
            bookings.map((doc) => {
              if (doc.status === "booked") {
                const startDate = new Date(doc.startDate);
                const timeDifference = startDate - Date.now();
                const remainingDays = Math.ceil(
                  timeDifference / (1000 * 60 * 60 * 24)
                );
                const options = {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                };
                return (
                  <div
                    key={doc._id}
                    className="flex flex-wrap justify-center gap-4 mt-2 px-4"
                  >
                    <div className="h-48 aspect-video overflow-hidden">
                      <img
                        src={`http://localhost:8000/${doc.packageId.coverImage[0]}`}
                        alt=""
                        className="w-full h-full object-center"
                      />
                    </div>
                    <div className="flex-grow my-auto font-body">
                      <span className="text-[10px] font-semibold text-gray-500">
                        {`booking id: ${doc._id}`}
                      </span>
                      <h2 className="font-bold text-[24px]">
                        {doc.packageId.packageName}
                      </h2>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        {`${doc.packageId.dayCount} Days ${doc.packageId.nightCount} Night`}
                      </p>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        Amount Paid:{" "}
                        <span>
                          <BiRupee className="inline text-base" />
                          {doc.paidAmount.toLocaleString()}
                        </span>
                      </p>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        Date of Booking:{" "}
                        <span>
                          {startDate.toLocaleDateString("en-US", options)}
                        </span>
                      </p>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        Travellers:{" "}
                        <span>
                          {doc.packageId.children !== 0
                            ? `${doc.packageId.adults} Adults ${doc.packageId.children} Child`
                            : `${doc.packageId.adults} Adults`}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2 justify-between items-center font-medium text-xs mt-2 ">
                        <p className="px-4 py-1 rounded-full bg-green-200">
                          {`your trip starts in ${remainingDays} days`}
                        </p>
                        <Link
                          to={`/packages/details/${doc.packageId._id}`}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-white hover:text-blue-600 ring-1 ring-blue-600 text-white text-base rounded-sm"
                        >
                          view package
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
              return;
            })}
        </div>
      )}

      {pastBookings && (
        <div className="bg-white mx-2 md:mx-8 mt-4 rounded shadow-lg py-4">
          <p className="font-body font-semibold text-lg text-gray-500  px-8 border-b border-dashed border-gray-500">
            Past Bookings
          </p>
          {bookings.length > 0 &&
            bookings.map((doc) => {
              if (doc.status === "completed") {
                const startDate = new Date(doc.startDate);
                const options = {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                };
                return (
                  <div
                    key={doc._id}
                    className="flex flex-wrap justify-center gap-4 mt-2 px-4"
                  >
                    <div className="h-48 aspect-video overflow-hidden">
                      <img
                        src={`http://localhost:8000/${doc.packageId.coverImage[1]}`}
                        alt=""
                        className="w-full h-full object-center"
                      />
                    </div>
                    <div className="flex-grow my-auto font-body">
                      <span className="text-[10px] font-semibold text-gray-500">
                        {`booking id: ${doc._id}`}
                      </span>
                      <h2 className="font-bold text-[24px]">
                        {doc.packageId.packageName}
                      </h2>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        {`${doc.packageId.dayCount} Days ${doc.packageId.nightCount} Night`}
                      </p>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        Amount Paid:{" "}
                        <span>
                          <BiRupee className="inline text-base" />
                          {doc.paidAmount.toLocaleString()}
                        </span>
                      </p>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        Date of Booking:{" "}
                        <span>
                          {startDate?.toLocaleDateString("en-US", options)}
                        </span>
                      </p>
                      <p className="font-medium text-sm text-gray-500 mb-1">
                        Travellers:{" "}
                        <span>
                          {doc.packageId.children !== 0
                            ? `${doc.packageId.adults} Adults ${doc.packageId.children} Child`
                            : `${doc.packageId.adults} Adults`}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2 justify-end items-center font-medium text-xs mt-2 ">
                        <Link
                          to={`/packages/details/${doc.packageId._id}`}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-white hover:text-blue-600 ring-1 ring-blue-600 text-white text-base rounded-sm"
                        >
                          view package
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-bg-1">
        <Footer />
      </div>
    </div>
  );
};

export default Bookings;
