import React from "react";
import { Link } from "react-router-dom";
import { BsCurrencyRupee } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";

const PackageInfo = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="hidden lg:flex justify-center w-full">
        <div className="grid grid-cols-5 w-5/6 my-4 bg-bg-1 shadow-lg rounded-3xl overflow-hidden ">
          <div className="col-span-3 p-4 flex flex-col justify-center gap-1 font-body">
            <h2 className="font-bold text-lg">{data.packageName}</h2>
            <p className="font-medium text-sm text-gray-600 mb-1">{`${data.dayCount} days ${data.nightCount} night`}</p>
            <p className="text-[12px] font-normal h-20 text-ellipsis overflow-scroll invisible-scrollbar">
              <span className="block border-b border-gray-600 text-gray-600 text-xs mb-1">
                summary
              </span>
              {data.summary}
            </p>
            <p className="font-semibold text-red-600 ">
              <BsCurrencyRupee className="inline" />
              {data.price}
              <IoMdPeople className="inline text-gray-600 ms-4" />
              <span className="text-[10px] ms-2 text-gray-600">{`${data.adults} / ${data.children}`}</span>
            </p>
            <p className="text-xs font-bold text-gray-600">{`seller: ${data.provider.brandName}`}</p>
            <div className="flex justify-start items-center gap-2 mt-1">
              <Link
                to={`/packages/book/${data._id}`}
                className=" font-bold text-base focus:outline-none text-white bg-primary hover:text-primary rounded-full hover:bg-inherit ring-1 ring-primary px-8 py-2"
              >
                Book now
              </Link>
              <Link
                to="/packages/details"
                className="font-bold text-base focus:outline-none text-primary rounded-full ring-primary ring-1 px-8 py-2"
              >
                see more
              </Link>
            </div>
          </div>
          <div className="col-span-2 overflow-hidden">
            <img
              src={`http://localhost:8000/${data.coverImage[0]}`}
              className="object-cover w-full h-72 "
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="lg:hidden px-8 mt-4">
        <div
          className="relative h-96 bg-no-repeat object-contain rounded-xl shadow-[0_0_10px_theme('colors.gray.500')]"
          style={{
            background: `url(http://localhost:8000/${data.coverImage[0]})`,
          }}
        >
          <div className="absolute left-6 right-6 bottom-4 bg-white/40  rounded focus:bg-white/90  hover:bg-white/90 hover:shadow-md  font-body p-4">
            <h2 className="font-bold text-lg">{data.packageName}</h2>
            <p className="font-medium text-sm text-gray-600 mb-1">{`${data.dayCount} days ${data.nightCount} night`}</p>
            <p className="text-[12px] font-normal h-20 text-ellipsis overflow-scroll invisible-scrollbar">
              <span className="block border-b border-gray-600 text-gray-600 text-xs mb-1">
                summary
              </span>
              {data.summary}
            </p>
            <p className="font-semibold text-red-600 ">
              <BsCurrencyRupee className="inline" />
              {data.price}
              <IoMdPeople className="inline text-gray-600 ms-4" />
              <span className="text-[10px] ms-2 text-gray-600">{`${data.adults} / ${data.children}`}</span>
            </p>
            <p className="text-xs font-bold text-gray-600">{`seller: ${data.provider.brandName}`}</p>
            <div className="flex justify-start flex-wrap items-center gap-2 mt-1">
              <Link
                to={`/packages/book/${data._id}`}
                className=" font-bold text-base focus:outline-none text-white bg-primary hover:text-primary rounded-full hover:bg-inherit ring-1 ring-primary px-8 py-2"
              >
                Book now
              </Link>
              <Link
                to="/packages/details"
                className="font-bold text-base focus:outline-none text-primary rounded-full ring-primary ring-1 px-8 py-2"
              >
                see more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageInfo;
