import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";

const PrivateRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { authData } = useSelector((state) => state.provider);
  return Object.keys(authData).length > 0 ? (
    <div className="">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden invisible-scrollbar">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <BreadCrumb />
            <div className="mx-auto p-2 md:p-4 2xl:p-8">
              <ToastContainer />
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  ) : (
    <Navigate to="/provider/auth" />
  );
};

export default PrivateRoutes;
