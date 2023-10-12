import React, { useState, useEffect } from "react";
import { FaSearchLocation } from "react-icons/fa";

const SearchComponent = ({ placeholder, setSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleEnterKeypress = (e) => {
    if (e.keyCode === 13) {
      setSearch(keyword);
    }
  };
  const submitHandler = (e) => {
    setSearch(keyword);
  };

  return (
    <div className="bg-bg-1/60 py-16 flex justify-center font-body">
      <div className="flex justify-center w-4/6 items-center gap-4 px-6 py-2 rounded-full bg-white shadow-lg">
        <input
          type="text"
          id="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleEnterKeypress}
          className="w-full py-2 px-1 text-2xl focus:outline-none bg-inherit"
        />
        <label htmlFor="search" onClick={submitHandler}>
          <FaSearchLocation className="mx-auto text-2xl cursor-pointer hover:scale-125 transition-all duration-300" />
        </label>
      </div>
    </div>
  );
};

export default SearchComponent;
