import React, { useState } from "react";
import GeneralOptions from "../../components/Provider/GeneralOptions";
import AddActivities from "./AddActivities";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DailySchedule = ({
  setTooglePrice,
  dailySchedules,
  setShowDailySchedule,
  totalDays,
  setDailySchedules,
  day,
}) => {
  // const currKey = `Day${day}`;
  const [activeComponent, setActiveComponent] = useState("general");
  const generalForm = useForm({
    defaultValues: {
      foodOptions: [{ type: "", food: "", foodImage: [] }],
      travelling: {
        vehicleType: "suv",
        modelName: "innova",
        seats: 7,
      },
      accomodation: {
        type: "resort",
        name: "hill on misty",
        location: "vagamon",
        image: [],
      },
    },
  });

  const activityForm = useForm({
    defaultValues: {
      activity: [{ type: "", location: "", description: "", image: null }],
    },
  });

  const validateForm = (arr) => {
    const lastIndex = arr.length - 1;
    if (lastIndex === 0) {
      const lastObj = arr[lastIndex];
      const isEmpty = Object.values(lastObj).includes(
        (value) => value !== "" || false
      );
      return isEmpty;
    }
    return true;
  };

  const dailyInfoSubmit = async () => {
    const activityFormData = activityForm.getValues("activity");
    const generalFormData = generalForm.getValues();
    const isValid = validateForm(activityFormData);
    const activities = activityFormData.filter((activity, index) => {
      if (index === activityFormData.length - 1) return;
      if (activity.image.length > 0) {
        return {
          ...activity,
          image: [...activity.image],
        };
      }
      return activity;
    });

    if (!isValid) return toast.error("add minimum one activity");
    const temp = { ...generalFormData, activity: [...activities] };
    console.log(temp);
    if (day < totalDays) {
      await setDailySchedules([...dailySchedules, temp]);
      await setShowDailySchedule((prev) => {
        return {
          ...prev,
          day: prev.day + 1,
        };
      });
      toast.success(`Day ${day} Schedule saved`);
      setActiveComponent("general");
    } else if (day === totalDays) {
      await setDailySchedules([...dailySchedules, temp]);
      toast.success("Add Price and Finsh Package");
      setShowDailySchedule({ show: false });
      setTooglePrice(true);
    }
    generalForm.reset();
    activityForm.resetField("activity");
  };

  switch (activeComponent) {
    case "general":
      return (
        <GeneralOptions
          form={generalForm}
          setActiveComponent={setActiveComponent}
        />
      );
    case "activity":
      return (
        <AddActivities
          form={activityForm}
          day={day}
          totalDays={totalDays}
          dailyInfoSubmit={dailyInfoSubmit}
          setActiveComponent={setActiveComponent}
        />
      );
    default:
      return console.log("this from default");
  }
};

export default DailySchedule;
