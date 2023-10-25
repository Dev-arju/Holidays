import React from "react";
import LogoIcon from "./LogoIcon";
import { BsCurrencyRupee } from "react-icons/bs";

const Invoice = React.forwardRef(({ doc }, ref) => {
  return (
    <div
      style={{ aspectRatio: "1 / 1.4" }}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
      className="h-full text-center bg-white shadow-sm mx-auto p-14"
    >
      <div className="w-full h-full border border-gray-400 font-body">
        <div className="title flex flex-wrap justify-between items-center px-4">
          <LogoIcon />

          <div className="flex-grow text-end">
            <h2 className="font-semibold text-primary text-[24px] pt-2.5 px-2 leading-tight">
              Invoice
            </h2>
            <p className="font-medium text-black/60 text-[10px] pr-2">
              {doc._id}
            </p>
          </div>
        </div>
        <p className="px-2 font-medium text-xs py-1 text-end mt-4 bg-neutral-50 text-black/60">
          date:{" "}
          {doc.createdAt
            ? new Date(doc.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
            : "N/A"}
        </p>
        <div className="px-2 mt-2.5 text-left">
          <h4 className="font-semibold text-sm mb-1 leading-tight">
            Invoice To
          </h4>
          <p className="font-medium text-xs leading-relaxed text-gray-400">
            {doc.userId.name}
          </p>
          <p className="font-medium text-[10px] text-gray-400">
            {doc.userId.email}
          </p>
        </div>
        <div className="mt-4 pb-4 text-xs h-32">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-blue-600 bg-neutral-200">
                <th className="text-left ps-4">Item</th>

                <th className="text-right pe-4">Duration</th>
                <th className="text-right pe-4">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" ">
                <td className="text-left ps-4 py-2">
                  {doc.packageId.packageName} <br />{" "}
                  <span className="text-[10px] text-gray-400">
                    {`${doc.packageId.adults} Adults ${doc.packageId.children} Child`}
                  </span>
                </td>
                <td className="text-right pe-4 text-[10px] font-medium py-2">
                  {`${doc.packageId.dayCount} DAY ${doc.packageId.nightCount} NIGHT`}
                </td>
                <td className="text-right pe-4 py-2">{doc.packageId.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="border border-gray-500 w-11/12 mx-auto" />
        <div className="text-right px-4 pt-2.5 font-bold">
          Total
          <span className="ms-2">
            <BsCurrencyRupee className="inline-block m-auto" />
            {doc.packageId.price}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="px-4 text-left mt-4">
            <p className="font-semibold text-xs text-blue-400 underline leading-relaxed">
              Seller Information
            </p>
            <p className="font-medium text-[10px] px-2 mt-1.5">
              {doc.packageId.provider.brandName}
            </p>
            <p className="font-medium text-[10px] px-2">
              {doc.packageId.provider.bussinessEmail}
            </p>
            {doc.packageId.provider.gst !== "" && (
              <p className="font-medium text-[10px] px-2">
                {doc.packageId.provider.gst}
              </p>
            )}
          </div>
          <div className="px-4 text-left mt-4">
            <p className="font-semibold text-xs text-blue-400 underline leading-relaxed">
              Additional Details
            </p>
            <p className="font-medium text-[10px] px-2 mt-1.5">
              <span>paid - </span>
              {doc.paidAmount ? doc.paidAmount : "N/A"}
            </p>
            <p className="font-medium text-[10px] px-2">
              <span>status - </span>
              {doc.status}
            </p>
            <p className="font-medium text-[10px] px-2">
              <span>event date - </span>
              {new Date(doc.startDate).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}
            </p>
          </div>
        </div>
        <div className="font-semibold font-title text-[18px] mt-8">
          Thank You!
        </div>
      </div>
    </div>
  );
});
export default Invoice;
