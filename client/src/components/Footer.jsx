import React from "react";
import { Link } from "react-router-dom";
import { PiCopyrightBold } from "react-icons/pi";
import LogoIcon from "./LogoIcon";

const Footer = () => {
  return (
    <>
      <footer className="flex bg-black text-white flex-wrap-reverse justify-between  items-end font-body pb-2 pt-4 text-xs">
        <main className="flex items-center self-center ml-8">
          <div className="hidden md:flex">
            <PiCopyrightBold />
            <p className="ml-1">Heaven Holidays 2023</p>
          </div>
          <ul className="text-center flex-grow flex flex-wrap font-sans text-xs gap-2 md:ml-4">
            <Link to="/">Find Package</Link>
            <Link to="/auth">Sign In</Link>
            <Link to="/register">Sign Up</Link>
            <li className="cursor-pointer">Get Help</li>
          </ul>
        </main>
        <Link to="/" className=" ml-2 mr-8 mb-4 md:mb-0">
          <LogoIcon />
        </Link>
      </footer>
    </>
  );
};

export default Footer;
