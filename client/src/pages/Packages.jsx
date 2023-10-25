import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { GridLoader } from "react-spinners";
import { getRequest } from "../utils/axios";
import SearchComponent from "../components/SearchComponent";
import Footer from "../components/Footer";
import PackageInfo from "../components/PackageInfo";
import { toast, ToastContainer } from "react-toastify";
import { AiFillCaretDown } from "react-icons/ai";

import downArrow from "../assets/arrow-down.png";

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

  const sortHandler = async (e) => {
    const option = e.target.value;
    const packages = [...fetchPackages];
    switch (option) {
      case "highToLow":
        setFetchPackages(packages.sort((a, b) => b.price - a.price));
        break;
      case "lowToHigh":
        setFetchPackages(packages.sort((a, b) => a.price - b.price));
        break;
      case "ascend":
        setFetchPackages(
          packages.sort((a, b) => a.packageName.localeCompare(b.packageName))
        );
        break;
      case "desend":
        setFetchPackages(
          packages.sort((a, b) => b.packageName.localeCompare(a.packageName))
        );
        break;
      default:
        return;
    }
  };

  console.log(fetchPackages);

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
          <div className="grid mx-auto place-items-end  w-5/6">
            <div className="relative font-body rounded-full overflow-hidden font-semibold bg-neutral-100">
              <select
                class="border-none appearance-none text-gray-500 min-w-max cursor-pointer text-lg focus:outline-none ps-4 pr-8 py-2"
                onChange={sortHandler}
              >
                <option className="text-sm" value="" hidden>
                  Sort By
                </option>
                <option className="text-sm" value="highToLow">
                  Price High - Low
                </option>
                <option className="text-sm" value="lowToHigh">
                  Price Low - High
                </option>
                <option className="text-sm" value="ascend">
                  Package name A - Z
                </option>
                <option className=" text-sm" value="desend">
                  Package name Z - A
                </option>
              </select>
              <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                <AiFillCaretDown />
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
