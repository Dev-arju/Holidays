import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRequest } from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import {
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
  BsCurrencyRupee,
  BsFillHeartFill,
} from "react-icons/bs";
import { MdToday } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PackgeDetails = () => {
  const { packageId } = useParams();
  const [coverImgIndex, setCoverImgIndex] = useState(0);
  const [packageData, setPackageData] = useState(null);
  const [currDayIdx, setCurrDayIdx] = useState(0);

  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      const { data, error } = await getRequest(`/users/booking/${packageId}`);
      if (data) {
        setPackageData(data);
      }
      if (error) {
        console.log(error);
        toast.error(error.message);
      }
    })();
  }, []);

  const leftArrowHandler = (e) => {
    e.preventDefault();
    if (coverImgIndex === 0) {
      return setCoverImgIndex(packageData?.coverImage.length - 1);
    }
    setCoverImgIndex((prev) => prev - 1);
  };
  const rightArrowHandler = (e) => {
    e.preventDefault();
    if (coverImgIndex === packageData?.coverImage.length - 1) {
      return setCoverImgIndex(0);
    }
    setCoverImgIndex((prev) => prev + 1);
  };

  console.log(packageData);
  return (
    <div className="relative min-h-screen pt-12 pb-24 bg-bg-1/60 ">
      <Navbar />
      <ToastContainer />
      <section className="text-gray-600 font-body">
        <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
          <div className="relative lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <div className="w-full h-full flex overflow-hidden">
              {packageData?.coverImage.map((src, index) => {
                return (
                  <img
                    key={src}
                    className={
                      coverImgIndex === index
                        ? "object-cover transition-all duration-500 ease-linear aspect-square object-center rounded"
                        : "object-cover  aspect-square object-center rounded hidden"
                    }
                    alt="hero"
                    src={`http://localhost:8000/${src}`}
                  />
                );
              })}
            </div>
            <div
              onClick={leftArrowHandler}
              className="absolute top-1/2 -translate-y-1/2 left-4 text-[24px] m-0 p-2 rounded-full cursor-pointer text-white bg-black/60"
            >
              <BsFillCaretLeftFill />
            </div>
            <div
              onClick={rightArrowHandler}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-[24px] m-0 p-2 rounded-full cursor-pointer text-white bg-black/60"
            >
              <BsFillCaretRightFill />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2 text-neutral-50">
              {packageData?.coverImage.map((src, index) => {
                return (
                  <GoDotFill
                    key={src}
                    onClick={() => setCoverImgIndex(index)}
                    className={
                      coverImgIndex === index ? "text-sky-200" : "text-white"
                    }
                  />
                );
              })}
            </div>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-1 font-medium text-gray-900">
              {packageData?.packageName}
            </h1>
            <p className="mb-4 font-bold text-sm ps-8">{`${packageData?.dayCount} Days ${packageData?.nightCount} Night`}</p>
            <p className="mb-4 leading-relaxed">{packageData?.summary}</p>
            <p className="font-bold text-sm mb-1">
              {packageData?.children === 0
                ? `Travallers: ${packageData?.adults} Adults`
                : `Travallers: ${packageData?.adults} Adults ${packageData?.children} Child`}
            </p>
            <p className="mb-2 flex gap-2 items-center">
              <BsCurrencyRupee className="inline text-2xl font-bold" />
              <span className="font-body font-bold text-[24px]">3,000</span>
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to={`/packages/book/${packageData?._id}`}
                className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Book Now
              </Link>
              <button className=" text-green-500 ring-1 ring-green-500 bg-gray-100 py-2 px-3 focus:outline-none hover:bg-green-500 hover:text-white rounded-full text-lg">
                <BsFillHeartFill />
              </button>
            </div>
            <p className="font-body font-semibold text-indigo-500 mt-2 text-sm">{`seller: ${packageData?.provider.brandName}`}</p>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5  mx-auto flex flex-wrap flex-col">
          <ul className="flex mx-auto flex-wrap mb-8">
            {packageData?.dailySchedules.map((dayObj, index) => {
              return (
                <li
                  key={new Date(`${index}-12-2000`)}
                  onClick={() => setCurrDayIdx(index)}
                  className={
                    currDayIdx === index
                      ? "sm:px-6 py-3 min-w-max sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t cursor-pointer"
                      : "sm:px-6 py-3 min-w-max text-gray-500 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider cursor-pointer"
                  }
                >
                  <MdToday className="text-xl mr-3 pt-0.5" />
                  {`Day ${index + 1}`}
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col text-center w-full ps-8 py-4 mb-8 bg-neutral-200 rounded-lg shadow-lg">
            <h1 className="text-xl text-left font-semibold font-tabs mb-4 text-gray-900">
              Food Available
            </h1>

            <ol className="border-l border-neutral-300 dark:border-neutral-500">
              {packageData?.dailySchedules[currDayIdx].foodOptions.map(
                (doc, index) => {
                  return (
                    <li key={new Date(`1${index}-11-2021`)}>
                      <div className="flex-start flex items-center pt-3">
                        <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                        <p className="text-base text-black">{`${doc.type} - ${doc.food}`}</p>
                      </div>
                    </li>
                  );
                }
              )}
            </ol>
          </div>
          <div className="flex flex-col text-center w-full ps-8 py-4 mb-8 bg-neutral-200 rounded-lg shadow-lg">
            <h1 className="text-xl text-left font-semibold font-tabs mb-4 text-gray-900">
              Travelling
            </h1>

            <ol className="border-l border-neutral-300 dark:border-neutral-500">
              <li>
                <div className="flex-start flex items-center pt-3">
                  <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                  <p className="text-base text-black">
                    {` ${packageData?.dailySchedules[currDayIdx].travelling.vehicleType} 
                       ${packageData?.dailySchedules[currDayIdx].travelling.seats} seater 
                       ${packageData?.dailySchedules[currDayIdx].travelling.modelName}`}
                  </p>
                </div>
              </li>
            </ol>
          </div>
          {packageData?.dailySchedules[currDayIdx].accomodation.name !== "" && (
            <div className="flex flex-col text-center w-full px-8 py-4 mb-8 bg-neutral-200 rounded-lg shadow-lg">
              <h1 className="text-xl text-center font-semibold font-tabs mb-4 text-gray-900">
                Stay at night
              </h1>

              <div className="flex flex-col rounded-lg bg-gray-400 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] max-w-xl mx-auto md:flex-row">
                {packageData?.dailySchedules[currDayIdx].accomodation.image !==
                  "" && (
                  <img
                    className="w-full rounded-t-lg object-cover md:w-72 aspect-video md:rounded-none md:rounded-l-lg"
                    src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
                    alt=""
                  />
                )}
                <div className="flex flex-col mx-auto p-6 text-white">
                  <h5 className="mb-2 text-xl font-medium">
                    {packageData?.dailySchedules[currDayIdx].accomodation.name}
                  </h5>
                  <p className="mb-4 text-base ">
                    {
                      packageData?.dailySchedules[currDayIdx].accomodation
                        .location
                    }
                  </p>
                  <p className="text-xs">
                    {packageData?.dailySchedules[currDayIdx].accomodation.type}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="font-body bg-neutral-200 py-4 px-8 rounded-lg shadow-lg">
            <h2 className=" font-tabs font-semibold text-center text-xl text-gray-900 mb-4">
              Activities
            </h2>
            <div className="flex gap-2 flex-wrap">
              {packageData?.dailySchedules[currDayIdx].activity.map(
                (doc, idx) => {
                  return (
                    <div
                      key={new Date(`${idx + 1}-11-2016`)}
                      className="xl:w-1/4 md:w-2/5 shadow-lg mx-auto"
                    >
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <img
                          className="h-40 rounded w-full object-cover object-center mb-6"
                          src={`http://localhost:8000/${doc.image}`}
                          alt="content"
                        />
                        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                          {doc.type}
                        </h3>
                        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                          {doc.location}
                        </h2>
                        <p className="leading-relaxed text-base">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="absolute bottom-0 left-0 right-0 bg-bg-1">
        <Footer />
      </div>
    </div>
  );
};

export default PackgeDetails;
