import React, { useState } from "react";

const paymentTabs = (initial, total) => {
  const [currPage, setCurrPage] = useState(initial);

  const goPrev = () => {
    if (currPage > 1) {
      setCurrPage((prev) => prev - 1);
    }
  };

  const goNext = () => {
    if (currPage < total) {
      setCurrPage((prev) => prev + 1);
    }
  };

  return [currPage, goPrev, goNext];
};

export default paymentTabs;
