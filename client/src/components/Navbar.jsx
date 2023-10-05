import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { dropCredential } from "../redux/slices/userSlice";
import LogoIcon from "./LogoIcon";

const TOOLTIP_STYLE = {
  paddingLeft: "4px",
  paddingRight: "4px",
  paddingTop: "2px",
  paddingBottom: "2px",
  fontSize: "12px",
  backgroundColor: "#616161",
};

const Navbar = ({ scrollToFeaturedSection }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.user);

  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target)) return;
      setSidebarOpen(false);
    };
    const scrollHandler = ({ target }) => {
      if (!sidebarOpen) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("scroll", scrollHandler);
    };
  });

  const toggleBtnHandler = (e) => {
    e.stopPropagation();
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(dropCredential());
  };

  console.log(sidebarOpen);

  return (
    <>
      <header className="static top-0 z-40 bg-neutral-100 w-full drop-shadow">
        <nav className="flex justify-between items-center px-4 lg:grid lg:grid-cols-8 py-1">
          <Link to="/" className="lg:col-span-2 ml-2">
            <LogoIcon />
          </Link>
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center gap-5">
            <ul className="flex gap-6 text-sm font-tabs cursor-pointer">
              {location.pathname === "/" ? (
                <button
                  onClick={() => scrollToFeaturedSection()}
                  className="hover:scale-110"
                >
                  New & Featured
                </button>
              ) : (
                <Link to="/#featuredSection" className="hover:scale-110">
                  New & Featured
                </Link>
              )}

              <NavLink to="/packages" className="hover:scale-110">
                Packages
              </NavLink>
              <li className="hover:scale-110">Rooms & Resorts</li>
              <li className="hover:scale-110">Contact Us</li>
            </ul>
          </div>
          <div className="lg:col-span-1 flex justify-center items-center">
            {Object.keys(authData).length > 0 ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/saved"
                  data-tooltip-id="favorates"
                  data-tooltip-content="favorates"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 hover:transform hover:-translate-y-1 hover:scale-105"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </Link>
                <Tooltip style={TOOLTIP_STYLE} id="favorates" place="bottom" />
                <Link
                  to="/bookings"
                  data-tooltip-id="bookings"
                  data-tooltip-content="bookings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 hover:transform hover:-translate-y-1 hover:scale-105"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </Link>
                <Tooltip style={TOOLTIP_STYLE} id="bookings" place="bottom" />

                <button
                  className="ml-2 p-[0.10rem] overflow-hidden w-10 h-10 rounded-full bg-neutral-200 shadow-md hover:drop-shadow-lg cursor-pointer"
                  onClick={handleLogout}
                >
                  {authData?.avatar !== "" ? (
                    <img
                      src={authData.avatar}
                      alt=""
                      className="object-cover rounded-full z-50"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="object-cover"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ) : (
              <div className="hidden lg:block">
                <NavLink
                  to="/auth"
                  className="rounded-2xl hover:shadow-gray-500/100  py-2 px-4 cursor-pointer  font-bold bg-secondary shadow-md shadow-gray-500/50 font-body text-sm text-primary"
                >
                  Account
                </NavLink>
              </div>
            )}
            <div
              className="lg:hidden cursor-pointer transition-all duration-200"
              onClick={toggleBtnHandler}
            >
              {sidebarOpen ? (
                <AiOutlineClose className="mx-auto w-6 h-6 text-red-800" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              )}
            </div>
          </div>
        </nav>
      </header>
      {sidebarOpen && (
        <aside
          ref={sidebar}
          className={`absolute left-0 top-14 z-50 flex h-screen w-56 flex-col overflow-y-hidden bg-neutral-100 text-black/75  duration-300 ease-linear lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col overflow-y-auto duration-300 ease-linear invisible-scrollbar">
            {/* <!-- Sidebar Menu --> */}
            <nav className="mt-5 py-4 px-4 lg:m-0  lg:px-6 font-tabs">
              {/* <!-- Menu Group --> */}
              <div>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {/* <!-- Menu Item Dashboard --> */}
                  <li>
                    {location.pathname === "/" ? (
                      <button
                        onClick={() => scrollToFeaturedSection()}
                        className="group relative flex items-center gap-2.5 py-2 px-4 font-medium duration-300 ease-in-out"
                      >
                        New & Featured
                      </button>
                    ) : (
                      <NavLink
                        to="/#featuredSection"
                        className="group relative flex items-center gap-2.5 py-2 px-4 font-medium duration-300 ease-in-out"
                      >
                        New & Featured
                      </NavLink>
                    )}
                  </li>
                  {/* <!-- Menu Item Dashboard --> */}

                  {/* <!-- Menu Item Packages --> */}
                  <li>
                    <NavLink
                      to="packages"
                      className="group relative flex items-center gap-2.5 py-2 px-4 font-medium duration-300 ease-in-out"
                    >
                      Packages
                    </NavLink>
                  </li>
                  {/* <!-- Menu Item Packages --> */}

                  {/* <!-- Menu Item Properties --> */}
                  <li>
                    <NavLink
                      to="#"
                      className="group relative flex items-center gap-2.5 py-2 px-4 font-medium duration-300 ease-in-out"
                    >
                      Rooms & Resorts
                    </NavLink>
                  </li>
                  {/* <!-- Menu Item Properties --> */}

                  {/* <!-- Menu Item Reservations --> */}
                  <li>
                    <NavLink
                      to="#"
                      className="group relative flex items-center gap-2.5 py-2 px-4 font-medium duration-300 ease-in-out"
                    >
                      Contact Us
                    </NavLink>
                  </li>
                  {/* <!-- Menu Item Reservations --> */}

                  {/* <!-- Menu Item Bookings --> */}
                  <li>
                    <NavLink
                      to="/auth"
                      className="group relative flex items-center gap-2.5 py-2 px-4 font-medium duration-300 ease-in-out"
                    >
                      Account
                    </NavLink>
                  </li>
                  {/* <!-- Menu Item Bookings --> */}
                </ul>
              </div>
            </nav>
            {/* <!-- Sidebar Menu --> */}
          </div>
        </aside>
      )}
    </>
  );
};

export default Navbar;
