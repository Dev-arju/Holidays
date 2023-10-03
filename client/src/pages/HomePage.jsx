import React from "react";
import Navbar from "../components/Navbar";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
const coverImage = "src/assets/munnar/attukal-waterfalls-munnar.jpg";
const sampleImage = "src/assets/ayurveda-kerala-tourism.jpg";

const HomePage = () => {
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
      <Navbar />
      <div className="w-full bg-bg-1 grid md:grid-cols-2 justify-center gap-4 items-center py-8">
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
            <button className="animate-rotate px-6 py-2 bg-white/60 rounded-md hover:bg-white/80 hover:shadow-md transition-all duration-300 shadow-lg">
              more details
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center font-body mt-6">
        <div>
          <img src={sampleImage} alt="" />
        </div>
        <div>ghjk</div>
      </div>
    </>
  );
};

export default HomePage;
