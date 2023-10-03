import asyncHandler from "express-async-handler";
import Package from "../models/packageModel.js";

// @desc Add new Package
// route POST /api/provider/package/add
// @access Private
export const addNewPackage = asyncHandler(async (req, res) => {
  const { providerId } = req;
  const images = req.files;
  const {
    packageName,
    dayCount,
    nightCount,
    summary,
    phoneNumbers,
    adults,
    children,
    price,
  } = req.body;
  let { dailySchedules } = req.body;
  dailySchedules = JSON.parse(dailySchedules);

  dailySchedules.forEach((day, index) => {
    const activityImages = images.filter((img) => {
      if (img.fieldname === `Day${index + 1}-activity`) {
        return img;
      }
    });
    const foodImages = images.filter((img) => {
      if (img.fieldname === `Day${index + 1}-foods`) {
        return img;
      }
    });
    const stayImage = images.filter((img) => {
      if (img.fieldname === `Day${index + 1}-property`) {
        return img;
      }
    });
    if (stayImage.length > 0) {
      day.accomodation.image = `${stayImage[0]?.destination
        .split("/")
        .slice(2)
        .join("/")}/${stayImage[0]?.filename}`;
    }
    if (activityImages.length > 0) {
      day.activity.forEach((item, i) => {
        const dest = activityImages[i].destination
          .split("/")
          .slice(2)
          .join("/");
        item.image = `${dest}/${activityImages[i].filename}`;
      });
    }
    if (foodImages.length > 0) {
      day.foodOptions.forEach((item, i) => {
        const dest = foodImages[i].destination.split("/").slice(2).join("/");
        item.image = `${dest}/${foodImages[i].filename}`;
      });
    }
  });

  const coverImage = images.filter((img) => {
    if (img.fieldname === "coverImage") {
      return img;
    }
  });

  try {
    const newPackage = await Package.create({
      provider: providerId,
      packageName,
      dayCount: parseInt(dayCount),
      nightCount: parseInt(nightCount),
      summary,
      adults: parseInt(adults),
      children: parseInt(children),
      phoneNumbers: phoneNumbers.filter((num) => num !== ""),
      price,
      coverImage: coverImage.map((img) => {
        const dest = img.destination.split("/").slice(2).join("/");
        return `${dest}/${img.filename}`;
      }),
      dailySchedules,
    });

    if (newPackage) {
      return res.status(200).json(newPackage);
    }
  } catch (error) {
    console.log(error);
    res.status(200);
    throw error;
  }
});

// @desc Retrive all packages listed under provider
// route GET /api/provider/packages
// @access Private
export const getAllPackages = asyncHandler(async (req, res) => {
  const { providerId } = req;
  try {
    const packages = await Package.find({ provider: providerId });
    if (packages) {
      return res.status(200).json(packages);
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw error;
  }
});
