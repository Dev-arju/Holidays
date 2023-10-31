import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getRequest } from "../utils/axios";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import FeaturedRow from "../components/FeaturedRow";
import Footer from "../components/Footer";

const sampleImage = "src/assets/ayurveda-kerala-tourism.jpg";

const HomePage = () => {
  const [newPackages, setNewPackages] = useState(null);
  const featuredSection = useRef(null);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const { data, error } = await getRequest("/users/latest");
      if (data) {
        setNewPackages(data);
      }
      if (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/" &&
      location.hash === "#featuredSection" &&
      newPackages
    ) {
      return scrollToFeaturedSection();
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [newPackages, location]);

  const scrollToFeaturedSection = () => {
    if (featuredSection.current) {
      featuredSection.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseOver = (e) => {
    if (e.target === e.currentTarget) return;
    const images = e.currentTarget.querySelectorAll("img");
    const currImage = e.target;
    images.forEach((img) => {
      if (img !== currImage) {
        return img.classList.replace("w-36", "w-16");
      }
      return img.classList.replace("w-16", "w-36");
    });
  };

  return (
    <div className="pt-12">
      <Navbar scrollToFeaturedSection={scrollToFeaturedSection} />
      <div className="w-full bg-bg-1/40 grid md:grid-cols-2 justify-center gap-4 items-center py-8">
        <div className="flex justify-center md:justify-end">
          <div className="flex  gap-2" onMouseOver={(e) => handleMouseOver(e)}>
            <div className="overflow-hidden rounded-md transition ease-in-out  duration-300">
              <img
                src="src/assets/boat-races-kerala-tourism.jpg"
                alt=""
                className="w-36 h-36 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md transition ease-in-out  duration-300">
              <img
                src="src/assets/art-forms-kerala-tourism.jpg"
                alt=""
                className="w-16 h-36 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md transition ease-in-out  duration-300">
              <img
                src="src/assets/hill-stations-kerala-tourism.jpg"
                alt=""
                className="w-16 h-36 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md transition ease-in-out  duration-300">
              <img
                src="src/assets/ayurveda-kerala-tourism.jpg"
                alt=""
                className="w-16 h-36 object-cover"
              />
            </div>
          </div>
        </div>
        <div className="heading font-body max-w-md px-2">
          <h2 className="text-center font-bold underline text-xl">
            Explore Kerala
          </h2>
          <div className="flex flex-wrap justify-center mt-3">
            <p className="text-sm ml-2 pl-2 font-medium text-center">
              Travel into the world of hidden natural wonders, glorious history,
              glamorous traditions, aromatic ayurvedic spas and an unforgettable
              culinary experience..
            </p>
            <Link
              to="/packages"
              className="font-tabs font-bold px-4 pt-1 pb-1.5 rounded-sm bg-black text-secondary mt-3 hover:scale-110 hover:shadow-lg shadow-md"
            >
              explore
            </Link>
          </div>
        </div>
      </div>
      <Banner />
      <div
        className=" bg-bg-1/40 font-body mt-6 pt-4"
        id="featuredSection"
        ref={featuredSection}
      >
        <div className="flex justify-center items-center ">
          <h2 className="font-title font-extrabold text-lg px-24 py-2 shadow-inner bg-white/60 border-b border-gray-400">
            New & Featured
          </h2>
        </div>
        {newPackages?.map((doc) => (
          <FeaturedRow doc={doc} />
        ))}
        <div className="text-black bg-bg-1">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
