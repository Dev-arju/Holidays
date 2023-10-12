import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { GridLoader } from "react-spinners";
import { getRequest } from "../utils/axios";
import SearchComponent from "../components/SearchComponent";
import Footer from "../components/Footer";
import PackageInfo from "../components/PackageInfo";
import { toast, ToastContainer } from "react-toastify";

const Packages = () => {
  const [search, setSearch] = useState("");
  const [fetchPackages, setFetchPackages] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error, message } = await getRequest(
        `/users/packages?search=${search}`
      );
      if (data) {
        setFetchPackages(data);
      }
      if (error) {
        setFetchPackages([]);
        toast.error(error?.message || message);
        console.log(error?.message || message);
      }
    })();
  }, [search]);

  return (
    <div className="relative min-h-screen bg-bg-1/60">
      <Navbar />
      <ToastContainer />
      <SearchComponent
        placeholder="search travel packages"
        setSearch={setSearch}
      />
      {fetchPackages.length > 0 ? (
        <div className="pb-8 bg-bg-1/60">
          <div className=" flex justify-center w-full">
            <div className="grid md:grid-cols-5 w-5/6">
              <div className="md:col-start-5 flex justify-end pe-4">
                <p>sort by</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 justify-center lg:block">
            {fetchPackages.map((pkg) => {
              return <PackageInfo data={pkg} key={pkg._id} />;
            })}
          </div>
        </div>
      ) : (
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <GridLoader color="#36d7b7" />
        </div>
      )}
      <div className="text-black bg-bg-1 absolute bottom-0 translate-y-2/3 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Packages;
