import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";

const FeaturedRow = ({ doc }) => {
  const navigate = useNavigate();

  return (
    <div className="package-wrapper mb-6 mt-4">
      <div className="hidden  md:flex justify-center py-4 mx-4 mb-6 mt-4">
        <div className="ps-6 pe-12 bg-bg-1/70 shadow-lg w-[550px] min-h-max rounded-l-md">
          <h2 className="font-title mt-4 mb-3 text-lg font-bold text-green-700">
            {doc.provider.brandName}
          </h2>
          <h4 className="font-tabs font-semibold">
            <span className="border-b-2 text-2xl leading-8 text-clip border-gray-400">
              {doc.packageName}
            </span>
          </h4>
          <p className="text-xs font-body mt-4 mb-2">{doc.summary}</p>
          <p className="font-body text-sm font-medium text-gray-600 mb-1">
            {`${doc.dayCount} Days ${doc.nightCount} Night`}
          </p>
          <p className="flex gap-2 items-center font-body text-sm font-bold mb-4">
            <span>
              <BsFillPeopleFill />
            </span>
            {doc.adults + " / " + doc.children}
          </p>
          <div className="flex gap-2.5 items-center">
            <button
              onClick={() => navigate(`/packages/details/${doc._id}`)}
              className="px-5 py-2 font-body rounded-md bg-blue-400 hover:bg-blue-800 hover:skew-x-3 hover:-skew-y-3 hover:shadow-2xl mb-4 text-white"
            >
              see more
            </button>

            <p className="font-tabs text-red-600 font-semibold text-[24px] mb-4">
              {doc.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
        <div className="rounded-r-md w-64 overflow-hidden bg-bg-1/70 shadow-lg">
          <img
            src={`http://localhost:8000/${doc.coverImage[0]}`}
            alt="cover-image..."
            className="w-full aspect-square object-cover"
          />
        </div>
      </div>
      <div
        style={{
          background: `url(http://localhost:8000/${doc.coverImage[1]})`,
        }}
        className="md:hidden bg-cover  bg-no-repeat z-20 overflow-hidden w-full"
      >
        <div className=" p-4 mx-4 mb-4 bg-white/20 hover:bg-white/60 mt-16  shadow-md">
          <h2 className="font-title mt-4 mb-3 text-lg font-bold text-green-700">
            {doc.provider.brandName}
          </h2>
          <h4 className="font-tabs font-semibold">
            <span className="border-b-2 text-2xl leading-8 text-clip border-gray-400 ">
              {doc.packageName}
            </span>
          </h4>
          <p className="text-xs font-body mt-4 mb-2">{doc.summary}</p>
          <p className="font-body font-bold text-sm">{`${doc.dayCount} Days ${doc.nightCount} Night`}</p>
          <p className="flex gap-2 items-center font-body text-sm font-bold mb-4">
            <span>
              <BsFillPeopleFill />
            </span>
            {`${doc.adults} / ${doc.children}`}
          </p>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate(`/packages/details/${doc._id}`)}
              className="px-5 py-2 font-body rounded-full shadow-md font-semibold bg-primary mb-4 text-white"
            >
              see more
            </button>
            <p className="font-tabs text-red-600 font-semibold text-[24px] mb-4">
              {doc.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRow;
