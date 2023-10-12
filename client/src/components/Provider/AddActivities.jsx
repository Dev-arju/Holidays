import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

import ActivityForm from "./ActivityForm";

const AddActivities = ({
  setActiveComponent,
  totalDays,
  dailyInfoSubmit,
  day,
  form,
}) => {
  const [dataEntry, setDataEntry] = useState({ open: false, index: 0 });
  const [imgUrls, setImageUrls] = useState([]);
  const { control } = form;
  const { fields, append } = useFieldArray({
    name: "activity",
    control,
  });

  useEffect(() => {
    const urls = [];

    fields.forEach(async (field, index) => {
      if (fields.length < 1 || index === fields.length - 1) return;
      try {
        const readUrl = await readAsUrl(field.image[0]);
        urls.push(readUrl);
      } catch (error) {
        console.log(error);
      }
      setImageUrls([...urls]);
    });
  }, [fields]);

  const addActivity = (index) => {
    setDataEntry((prev) => {
      return {
        open: !prev.open,
        index: index,
      };
    });
  };

  function readAsUrl(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        resolve(dataUrl);
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      <div className="bg-neutral-50 grid grid-cols-2 md:grid-cols-4 gap-5 px-4 py-6 rounded-lg">
        <div className="col-span-2 md:col-span-4 pl-4">
          <p className="font-body text-sm font-bold">Activities</p>
        </div>
        {fields.map((field, index) => {
          return (
            index < 4 && (
              <div
                key={field.id}
                className={
                  index !== fields.length - 1
                    ? "relative col-span-1 pb-1.5 bg-sky-50 overflow-hidden rounded-md shadow-md text-black font-body"
                    : "relative col-span-1 pb-1.5 bg-sky-50 overflow-hidden rounded-md shadow-md text-gray-400 font-body"
                }
              >
                <div
                  className="relative w-full cursor-pointer"
                  onClick={
                    index === fields.length - 1
                      ? () => addActivity(index)
                      : null
                  }
                >
                  <div className="absolute top-2/3 w-full text-center text-sm font-bold font-body text-black z-30">
                    {index < fields.length - 1 ? "" : "Add Activity"}
                  </div>
                  <img
                    src={
                      index < fields.length - 1
                        ? imgUrls[index]
                        : "/src/assets/addImage.png"
                    }
                    alt="activity image"
                    className={
                      index < fields.length - 1
                        ? "w-full aspect-square"
                        : "w-full object-scale-down"
                    }
                  />
                </div>

                <h6 className="px-2 font-semibold text-xs py-1">
                  {field.type || "Accomodation Type"}
                </h6>
                <h2 className="px-2 text-sm font-bold pb-1">
                  {field.location || "Location"}
                </h2>
                <p className="px-2 text-[10px]">
                  {field.description || "description or specialities"}
                </p>
              </div>
            )
          );
        })}

        <div className="col-span-2 md:col-span-4 flex justify-center gap-4 font-body font-extrabold text-sm text-white">
          <button
            onClick={() => setActiveComponent("general")}
            className="px-5 py-2.5 rounded-md bg-sky-500 hover:bg-sky-800"
          >
            back
          </button>
          <button
            onClick={dailyInfoSubmit}
            className="px-5 py-2.5 rounded-md bg-primary hover:bg-purple-900"
          >
            {day === totalDays ? "Goto Pricing" : `Save Day ${day}`}
          </button>
        </div>
        {dataEntry.open && (
          <ActivityForm
            append={append}
            form={form}
            index={dataEntry.index}
            setDataEntry={setDataEntry}
          />
        )}
      </div>
    </>
  );
};

export default AddActivities;
