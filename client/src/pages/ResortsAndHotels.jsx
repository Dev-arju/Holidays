import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchComponent from "../components/SearchComponent";

const ResortsAndHotels = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("search handle here");
  }, [search]);

  return (
    <div>
      <Navbar />
      <SearchComponent
        placeholder="search resorts and hotels"
        setSearch={setSearch}
      />
    </div>
  );
};

export default ResortsAndHotels;
