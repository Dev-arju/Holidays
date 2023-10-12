import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getRequest, setAccessToken } from "../utils/axios";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { authData } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      setAccessToken(authData.token);
      const { data, error } = await getRequest("/users/bookings");
      if (data) {
        setBookings(data);
      }
      if (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  }, []);
  return (
    <div className="relative min-h-screen w-full bg-bg-1/60">
      <Navbar />
      <ToastContainer />
      <div className="absolute bottom-0 left-0 right-0 bg-bg-1">
        <Footer />
      </div>
    </div>
  );
};

export default Bookings;
