import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SavedBooking = () => {
  const [displayItem, setDisplayItem] = useState("packages");
  const [packages, setPackages] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      if (displayItem === "packages") {
      }
    })();
  }, [displayItem]);

  return (
    <div className="relative bg-bg-1/60 min-h-screen py-12 w-full">
      <Navbar />
      <main className="font-body">
        <div className="flex justify-center pt-2 font-semibold text-lg cursor-pointer">
          <h2
            onClick={() => setDisplayItem("packages")}
            className={
              displayItem === "packages"
                ? "flex-grow py-2 text-center border-r bg-bg-1   border-b border-gray-600"
                : "flex-grow py-2 text-center border-r bg-neutral-100 hover:bg-bg-1/40  border-b border-gray-600"
            }
          >
            Packages
          </h2>
          <h2
            onClick={() => setDisplayItem("rooms")}
            className={
              displayItem === "rooms"
                ? "flex-grow py-2 text-center border-r bg-bg-1  border-b border-gray-600"
                : "flex-grow py-2 text-center border-r bg-neutral-100 hover:bg-bg-1/40  border-b border-gray-600"
            }
          >
            Rooms & Resorts
          </h2>
        </div>
        <section className="text-gray-600 font-body">
          <h1 className="text-center font-bold text-[24px] py-4 underline underline-offset-4 text-gray-400">
            Favourites
          </h1>
          <div className="container px-5 py-6 mx-auto">
            <div className="flex flex-wrap">
              <div className="lg:w-1/3 md:w-1/2 w-full bg-neutral-50 rounded border border-bg-1">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/420x260"
                  />
                </a>
                <div className="mt-4 px-4 pb-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    The Catalyzer
                  </h2>
                  <p className="mt-1">$16.00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="absolute left-0 right-0 bottom-0 bg-bg-1">
        <Footer />
      </div>
    </div>
  );
};

export default SavedBooking;
