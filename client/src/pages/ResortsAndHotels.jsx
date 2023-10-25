import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getRequest } from "../utils/axios";
import SearchComponent from "../components/SearchComponent";
import { toast, ToastContainer } from "react-toastify";

const ResortsAndHotels = () => {
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error, message } = await getRequest("/users/properties");
      if (data) {
        console.log(data);
        setProperties(data);
      }
      if (error) {
        console.log(error);
        toast.error(error.message || message);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("search handle here");
  }, [search]);

  console.log(properties);

  return (
    <div className="min-h-screen relative bg-bg-1/60">
      <Navbar />
      <ToastContainer />
      <SearchComponent
        placeholder="search resorts and hotels"
        setSearch={setSearch}
      />
      <main>hello world</main>
      <div className="absolute left-0 right-0 bottom-0 bg-bg-1">
        <Footer />
      </div>
    </div>
  );
};

export default ResortsAndHotels;
