import React, { useState, useMemo } from "react";
import PackageInfo from "../../components/Provider/PackageInfo";
import DailySchedule from "../../components/Provider/DailySchedule";
import PackagePricing from "../../components/Provider/PackagePricing";

const AddPackage = () => {
  const [togglePackageInfo, setTogglePackageInfo] = useState(true);
  const [togglePrice, setTooglePrice] = useState(false);
  const [packageInfo, setPackageInfo] = useState(null);
  const [dailySchedules, setDailySchedules] = useState([]);
  const [showDailySchedule, setShowDailySchedule] = useState({
    show: false,
    day: 1,
  });
  const totalDays = useMemo(() => packageInfo?.dayCount, [packageInfo]);

  return (
    <>
      <div className="bg-neutral-50 shadow-lg rounded-lg p-4">
        <h2 className="text-center font-tabs text-lg">Create Package</h2>
        {showDailySchedule.show && (
          <div className="flex justify-between px-8 font-tabs md:col-span-4 text-center border-b-2 border-neutral-200">
            <h2 className="text-base font-bold">Daily Schedules</h2>
            <h6 className="">{`Day ${showDailySchedule.day}`}</h6>
          </div>
        )}

        {showDailySchedule.show && (
          <DailySchedule
            setDailySchedules={setDailySchedules}
            dailySchedules={dailySchedules}
            day={showDailySchedule.day}
            setShowDailySchedule={setShowDailySchedule}
            totalDays={totalDays}
            setTooglePrice={setTooglePrice}
          />
        )}
        {togglePackageInfo && (
          <PackageInfo
            setPackageInfo={setPackageInfo}
            setShowDailySchedule={setShowDailySchedule}
            setTogglePackageInfo={setTogglePackageInfo}
          />
        )}
        {togglePrice && (
          <PackagePricing
            packageInfo={packageInfo}
            dailySchedules={dailySchedules}
          />
        )}
      </div>
    </>
  );
};

export default AddPackage;
