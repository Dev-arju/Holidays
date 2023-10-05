import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import Footer from "../components/Footer";
const coverImage = "src/assets/munnar/attukal-waterfalls-munnar.jpg";
const sampleImage = "src/assets/ayurveda-kerala-tourism.jpg";

const HomePage = () => {
  const featuredSection = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#featuredSection") {
      scrollToFeaturedSection();
    }
  }, []);

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
    <>
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
            <button className="font-tabs font-bold px-4 py-1 rounded-sm bg-black text-secondary mt-3 hover:scale-110 hover:shadow-lg shadow-md">
              try it
            </button>
          </div>
        </div>
      </div>
      <div
        className="relative banner mt-6 px-12 py-6"
        style={{ minHeight: "360px" }}
      >
        <div className="absolute top-0 left-2 right-2 md:right-10 md:left-10 bottom-0 h-full overflow-hidden rounded-2xl -z-10">
          <img
            src={coverImage}
            className="object-cover w-full h-full shadow-inner"
            alt=""
          />
        </div>
        <h2 className="absolute text-center text-clip top-4 left-1/2 -translate-x-1/2 font-tabs font-bold text-2xl text-white px-4 py-1 rounded-lg drop-shadow-md bg-black/60">
          Best Value Packages
        </h2>
        <div className="absolute top-1/2 left-4 md:left-14 p-3 -translate-y-1/2 text-white/60 rounded-full bg-transparent/60 cursor-pointer">
          <AiOutlineCaretLeft className="mx-auto" />
        </div>
        <div className="absolute top-1/2 right-4 md:right-14 p-3 -translate-y-1/2 text-white/60 rounded-full bg-transparent/60 cursor-pointer">
          <AiOutlineCaretRight className="mx-auto" />
        </div>

        <div className="flex flex-wrap justify-between items-end gap-4 mx-8 md:mx-16 p-6 mt-36 md:mt-56 bg-black/40 rounded-xl ring-2 ring-white/40 hover:bg-black/80">
          <div className="flex-grow flex-shrink font-body text-white max-w-2xl">
            <p className="text-3xl font-bold mb-2">Vagmon - Kuttikkanam</p>
            <p className="mb-2 text-clip text-xs">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
              inventore ullam at blanditiis cupiditate sequi tempore ut eos
              natus. Architecto fugiat voluptate maxime illo optio saepe beatae,
              molestias voluptatem a?
            </p>
            <p>
              2 Days 1 Night <br />
              <span className="font-extrabold font-sans text-green-500 text-2xl">
                ₹ 5000
              </span>
            </p>
          </div>
          <div className="font-body text-base text-blue-800 font-bold">
            <button className="animate-rotate px-6 py-2 bg-white/60 rounded-full hover:bg-white/80 hover:shadow-md transition-all duration-300 shadow-lg">
              more details
            </button>
          </div>
        </div>
      </div>
      <div
        className=" bg-bg-1/40 font-body mt-6 pt-4"
        id="featuredSection"
        ref={featuredSection}
      >
        <div className="flex justify-center items-center ">
          <h2 className="font-title font-extrabold text-lg px-24 py-2 shadow-inner bg-white/60 ring ring-bg-1">
            New & Featured
          </h2>
        </div>

        <div className="package-wrapper mb-6 mt-4">
          <div className="hidden  md:flex justify-center py-4 mx-4 mb-6 mt-4">
            <div className="ps-6 pe-12 bg-bg-1/70 shadow-lg max-w-xl min-h-max rounded-l-md">
              <h2 className="font-title mt-4 mb-3 text-lg font-bold text-green-700">
                heaven holidays presents
              </h2>
              <h4 className="font-tabs font-semibold">
                <span className="border-b-2 text-2xl leading-8 text-clip border-gray-400">
                  Vagamon - Kuttikkanam
                </span>
              </h4>
              <p className="text-xs font-body mt-4 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium eos nostrum mollitia error dolorem ut at, odit ipsum
                minima dignissimos voluptate excepturi nobis aut nam iste
                delectus, sapiente, quod facilis!
              </p>
              <p className="font-body text-sm font-medium text-gray-600 mb-1">
                2 days 1 night
              </p>
              <p className="flex gap-2 items-center font-body text-sm font-bold mb-4">
                <span>
                  <BsFillPeopleFill />
                </span>
                2
              </p>
              <button className="px-5 py-2 font-body rounded-md bg-primary mb-4 text-white">
                see more
              </button>
            </div>
            <div className="rounded-r-md w-64 relative overflow-hidden bg-bg-1/70 shadow-lg px-6 ring-1 ring-black/60">
              <img
                src="src/assets/ayurveda-kerala-tourism.jpg"
                alt=""
                className="absolute top-0 right-0 bottom-0 left-0"
              />
            </div>
          </div>
          <div className="md:hidden bg-cover bg-[url('src/assets/hill-stations-kerala-tourism.jpg')] bg-no-repeat overflow-hidden w-full">
            <div className=" p-4 mx-4 mb-4 bg-white/20 hover:bg-white/60 mt-16  shadow-md">
              <h2 className="font-title mt-4 mb-3 text-lg font-bold text-green-700">
                heaven holidays presents
              </h2>
              <h4 className="font-tabs font-semibold">
                <span className="border-b-2 text-2xl leading-8 text-clip border-gray-400 ">
                  Vagamon - Kuttikkanam
                </span>
              </h4>
              <p className="text-xs font-body mt-4 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium eos nostrum mollitia error dolorem ut at, odit ipsum
                minima dignissimos voluptate excepturi nobis aut nam iste
                delectus, sapiente, quod facilis!
              </p>
              <p className="font-body font-bold text-sm">2 days 1 night</p>
              <p className="flex gap-2 items-center font-body text-sm font-bold mb-4">
                <span>
                  <BsFillPeopleFill />
                </span>
                2
              </p>
              <button className="px-5 py-2 font-body rounded-md bg-primary mb-4 text-white">
                see more
              </button>
            </div>
          </div>
        </div>
        <div className="package-wrapper mb-6 mt-4">
          <div className="hidden  md:flex justify-center py-4 mx-4 mb-6 mt-4">
            <div className="ps-6 pe-12 bg-bg-1/70 shadow-lg max-w-xl min-h-max rounded-l-md">
              <h2 className="font-title mt-4 mb-3 text-lg font-bold text-green-700">
                heaven holidays presents
              </h2>
              <h4 className="font-tabs font-semibold">
                <span className="border-b-2 text-2xl leading-8 text-clip border-gray-400">
                  Vagamon - Kuttikkanam
                </span>
              </h4>
              <p className="text-xs font-body mt-4 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium eos nostrum mollitia error dolorem ut at, odit ipsum
                minima dignissimos voluptate excepturi nobis aut nam iste
                delectus, sapiente, quod facilis!
              </p>
              <p className="font-body text-sm font-medium text-gray-600 mb-1">
                2 days 1 night
              </p>
              <p className="flex gap-2 items-center font-body text-sm font-bold mb-4">
                <span>
                  <BsFillPeopleFill />
                </span>
                2
              </p>
              <button className="px-5 py-2 font-body rounded-md bg-primary mb-4 text-white">
                see more
              </button>
            </div>
            <div className="rounded-r-md w-64 relative overflow-hidden bg-bg-1/70 shadow-lg px-6 ring-1 ring-black/60">
              <img
                src="src/assets/ayurveda-kerala-tourism.jpg"
                alt=""
                className="absolute top-0 right-0 bottom-0 left-0"
              />
            </div>
          </div>
          <div className="md:hidden bg-cover bg-[url('src/assets/hill-stations-kerala-tourism.jpg')] bg-no-repeat overflow-hidden w-full">
            <div className=" p-4 mx-4 mb-4 bg-white/20 hover:bg-white/60 mt-16  shadow-md">
              <h2 className="font-title mt-4 mb-3 text-lg font-bold text-green-700">
                heaven holidays presents
              </h2>
              <h4 className="font-tabs font-semibold">
                <span className="border-b-2 text-2xl leading-8 text-clip border-gray-400 ">
                  Vagamon - Kuttikkanam
                </span>
              </h4>
              <p className="text-xs font-body mt-4 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium eos nostrum mollitia error dolorem ut at, odit ipsum
                minima dignissimos voluptate excepturi nobis aut nam iste
                delectus, sapiente, quod facilis!
              </p>
              <p className="font-body font-bold text-sm">2 days 1 night</p>
              <p className="flex gap-2 items-center font-body text-sm font-bold mb-4">
                <span>
                  <BsFillPeopleFill />
                </span>
                2
              </p>
              <button className="px-5 py-2 font-body rounded-md bg-primary mb-4 text-white">
                see more
              </button>
            </div>
          </div>
        </div>

        <div className="text-black/70 bg-bg-1/40">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
