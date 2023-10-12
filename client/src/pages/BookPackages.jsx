import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getRequest, postRequest, setAccessToken } from "../utils/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentPackages from "../components/PaymentPackages";
import PackageReview from "../components/PackageReview";
import PackageDateSelect from "../components/PackageDateSelect";
import paymentTabs from "../hooks/paymentTabs";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { BiRupee, BiSolidErrorCircle } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

import Modal from "react-modal";

Modal.setAppElement("#root");

const BookPackages = () => {
  const [modal, setModal] = useState({
    state: false,
    success: false,
    message: "",
  });
  const [btnLoader, setBtnLoader] = useState(false);
  const [bookItem, setBookItem] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endsDate, setEndsDate] = useState(null);
  const [currPage, goPrev, goNext] = paymentTabs(1, 3);
  const { authData } = useSelector((state) => state.user);
  const { token } = authData;
  const { packageId } = useParams();
  const idForm = useForm({
    defaultValues: {
      title: "",
      name: "",
      documentName: "",
      documentNumber: "",
      tChecked: false,
    },
    mode: "onTouched",
  });
  const { handleSubmit } = idForm;
  let renderComponent;

  useEffect(() => {
    (async () => {
      setAccessToken(authData.token);
      const { data, error, message } = await getRequest(
        `/users/booking/${packageId}`
      );
      if (data) {
        setBookItem(data);
      }
      if (error) {
        console.log(error?.message || message);
      }
    })();
  }, []);

  switch (currPage) {
    case 1:
      renderComponent = (
        <PackageDateSelect
          item={bookItem}
          states={{ startDate, endsDate }}
          setStates={{ setStartDate, setEndsDate }}
        />
      );
      break;
    case 2:
      renderComponent = <PackageReview item={bookItem} startDate={startDate} />;
      break;
    case 3:
      renderComponent = <PaymentPackages item={bookItem} idForm={idForm} />;
      break;
    default:
      renderComponent = <PackageReview item={bookItem} startDate={startDate} />;
  }

  const nextHandler = (e) => {
    e.preventDefault();
    if (currPage === 1) {
      if (!startDate) {
        return toast.error("choose start date");
      }
      return goNext();
    }
    goNext();
  };

  const initPayment = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "Heaven Holidays",
      description: "Find your dream destinations",
      image:
        "https://www.freevector.com/uploads/vector/preview/14589/FreeVector-Globe-Vector-Icon.jpg",
      order_id: data.id,
      handler: async function (response) {
        setAccessToken(token);
        const { data, error } = await postRequest(
          "/users/new/package/verify",
          response
        );
        if (data) {
          setModal({ state: true, success: true, message: data.bookingId });
        }
        if (error) {
          console.log(error);
          setModal({ state: true, success: false, message: error.message });
        }
      },
      prefill: {
        name: data.notes.name,
      },
      notes: data.notes,
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      console.log(response.error);
      setModal({
        state: true,
        success: false,
        message: response.error.description,
      });
    });

    rzp1.open();
  };

  const submitInfo = async (form, e) => {
    e.preventDefault();
    setBtnLoader(true);
    const { data, error, message } = await postRequest("/users/new/package", {
      startDate,
      packageId,
      form,
    });
    if (data) {
      initPayment(data);
    }
    if (error || message) {
      console.log(error || message);
      toast.error(error?.message || message);
    }
    setBtnLoader(false);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <ToastContainer />
      <Modal
        isOpen={modal.state}
        shouldCloseOnOverlayClick={false}
        className="absolute z-50 top left-0 right-0  md:left-1/2 md:-translate-x-1/2 top-40 p-4 md:px-12  md:py-8 rounded shadow-lg focus:outline-none bg-white"
      >
        <div className="h-full font-body">
          <div
            className={
              modal.success
                ? "w-20 mx-auto aspect-square rounded-full bg-green-600 flex justify-center items-center"
                : "w-20 mx-auto aspect-square rounded-full bg-red-600 flex justify-center items-center"
            }
          >
            {modal.success ? (
              <IoMdCheckmark color="white" size={44} />
            ) : (
              <BiSolidErrorCircle color="white" size={44} />
            )}
          </div>
          <h2 className="text-center font-semibold text-[24px] mt-2">
            {modal.success ? "Payment Done" : "Payment Failed"}
          </h2>
          <p className="text-center font-medium text-sm mt-2">
            {modal.success
              ? "Thank you for completing your secure online payment."
              : modal?.message || "Please try again later or contact bank"}
          </p>
          {modal.success && (
            <p className="text-center font-medium text-gray-500 text-sm mt-2">
              your booking id: {modal.message}
            </p>
          )}
          <div className="flex justify-center items-center mt-4">
            {modal.success ? (
              <Link
                to="/bookings"
                className="px-5 py-1.5 bg-blue-400 text-white rounded hover:bg-blue-600 shadow-sm transition-all duration-200 focus:outline-none"
              >
                Go to Bookings
              </Link>
            ) : (
              <button
                className="px-5 py-1.5 bg-blue-400 text-white rounded hover:bg-blue-600 shadow-sm transition-all duration-200 focus:outline-none"
                onClick={() =>
                  setModal((prev) => ({ ...prev, state: !prev.state }))
                }
              >
                Return
              </button>
            )}
          </div>
        </div>
      </Modal>
      <div className="flex justify-center items-center text-green-600 font-tabs text-sm mt-8 px-8">
        <div
          className={
            currPage === 1
              ? "px-3 py-1 rounded-full text-center text-white bg-green-600 ring-green-600 ring-1"
              : "px-3 py-1 rounded-full text-center ring-green-600 ring-1"
          }
        >
          <span className="font-semibold m-0">1</span>
        </div>
        <hr
          className={
            currPage > 1
              ? "w-44 border border-green-400 overflow-hidden"
              : "w-44 border border-neutral-200 overflow-hidden"
          }
        />
        <div
          className={
            currPage === 2
              ? "px-3 py-1 rounded-full text-center text-white bg-green-600 ring-green-600 ring-1"
              : "px-3 py-1 rounded-full text-center ring-green-600 ring-1"
          }
        >
          <span className="font-semibold m-0">2</span>
        </div>
        <hr
          className={
            currPage > 2
              ? "w-44 border border-green-400 overflow-hidden"
              : "w-44 border border-neutral-200 overflow-hidden"
          }
        />
        <div
          className={
            currPage === 3
              ? "px-3 py-1 rounded-full text-center text-white bg-green-600 ring-green-600 ring-1"
              : "px-3 py-1 rounded-full text-center ring-green-600 ring-1"
          }
        >
          <span className="font-semibold m-0">3</span>
        </div>
      </div>
      <div className="pb-44  lg:flex justify-center gap-4 px-4 md:px-8">
        <div className="flex-grow">{renderComponent}</div>
        <div className="hidden lg:block w-64 max-w-sm mt-12 py-4 shadow-md">
          <div className="font-body sticky top-0 font-medium min-h-max">
            <p className="text-secondary bg-[#999] px-8 py-2.5">
              Amount to Pay
            </p>
            <div className="flex justify-between px-4 text-[26px] h-32 font-mono pt-4">
              <HiOutlineCurrencyRupee className="stroke-[#999] text-[48px]" />
              <p className="font-sans">{bookItem?.price.toLocaleString()}</p>
            </div>
            <p className="font-medium text-sm text-[#999] border-t border-[#999] pt-4 px-4 text-right">
              you have to pay
            </p>
            <div className="flex items-center justify-end gap-4 text-[36px] font-bold font-sans px-4 mb-2">
              <BiRupee />
              <span>{bookItem?.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 lg:left-0 lg:right-64 bottom-24 flex font-body font-semibold text-sm  justify-center gap-12 items-center mt-8">
        {currPage !== 1 && !btnLoader && (
          <button
            onClick={() => goPrev()}
            className="px-8 py-2.5 rounded-full text-orange-600 transition-colors duration-300 hover:text-white hover:bg-orange-300 focus:outline-none ring-1 ring-orange-300"
          >
            Back
          </button>
        )}
        {!btnLoader && currPage < 3 ? (
          <button
            onClick={nextHandler}
            className="px-8 py-2.5 rounded-full text-teal-500 transition-colors duration-300 hover:text-white hover:bg-teal-500 hover:shadow-lg focus:outline-none ring-1 ring-teal-500"
          >
            Next
          </button>
        ) : (
          !btnLoader && (
            <button
              onClick={handleSubmit(submitInfo)}
              className="px-8 py-2.5 flex justify-center items-center gap-2 rounded-full text-primary transition-colors duration-300 hover:text-white hover:bg-primary hover:shadow-lg focus:outline-none ring-1 ring-primary"
            >
              pay
            </button>
          )
        )}
        {btnLoader && <ClipLoader color="#3399cc" />}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-bg-1/60">
        <Footer />
      </div>
    </div>
  );
};

export default BookPackages;
