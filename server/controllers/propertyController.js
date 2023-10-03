import Property from "../models/propertyModel.js";
import asyncHandler from "express-async-handler";
import { unlink } from "fs";

// @desc Add New Property
// route POST /api/provider/property/add
// @access Private
export const addProperty = asyncHandler(async (req, res) => {
  const providerId = req.providerId;
  const propertyImages = req.files;
  const { propertyName, propertyLocation, propertyAddress, propertyPincode } =
    req.body;

  if (
    !propertyImages ||
    !propertyName ||
    !propertyLocation ||
    !propertyAddress ||
    !propertyPincode
  )
    return res.status(400).json({ message: "body parameters are invalid" });

  try {
    const newProperty = await Property.create({
      providerId,
      propertyName,
      propertyLocation,
      propertyAddress,
      propertyPincode,
      propertyImages: propertyImages.map(
        (img) =>
          `http://localhost:8000${img.destination.replace(/^.*?public/, "")}/${
            img.filename
          }`
      ),
    });
    if (newProperty) {
      res.status(200).json(newProperty);
    } else {
      throw new Error("error while creating property details on database");
    }
  } catch (error) {
    res.status(500);
    throw error;
  }
});

// @desc Addd Price Option
// route /api/provider/property/add/:propertyId
// @access Private

export const addPriceOption = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  const { planOptions } = req.body;
  if (!planOptions) {
    return res.status(400).json({ message: "invalid body parameters" });
  }
  try {
    const property = await Property.findById(propertyId);
    if (property) {
      await Property.updateOne(
        { _id: propertyId },
        { $set: { priceOptions: [...planOptions] } }
      ).then((result) => {
        console.log(
          `update price options of ${property.propertyName} is ${result.acknowledged}`
        );
        res.status(200).json(result);
      });
    }
  } catch (error) {
    res.status(404);
    throw error;
  }
});

// @desc Get All Properties
// route GET /api/provider/property
// @access Private
export const getAllProperties = asyncHandler(async (req, res) => {
  const providerId = req.providerId;
  try {
    const properties = await Property.find({ providerId });
    if (properties && properties.length > 0) {
      return res.status(200).json(properties);
    }
    throw new Error("properties not found");
  } catch (error) {
    res.status(404);
    throw error;
  }
});

// @desc Change Property Status
// route PUT /api/provider/property/:id
// @access Private
export const changePropertyStatus = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  try {
    const property = await Property.findById(propertyId);
    if (property) {
      const result = await Property.updateOne(
        { _id: property._id },
        { $set: { isAvailable: !property.isAvailable } }
      );
      if (result.acknowledged) {
        return res.status(200).json(result);
      }
    }
    throw new Error("operation failed");
  } catch (error) {
    console.log(error);
    res.status(404);
    throw error;
  }
});

// @desc Get Single Property Details
// route GET /api/provider/property/:id
// @access Private

export const getSinglePropertyDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (property) {
      return res.status(200).json(property);
    }
    throw new Error("operation failed");
  } catch (error) {
    console.log(error);
    res.status(404);
    throw error;
  }
});

// @desc Update property details
// route POST /api/provider/edit/:id
// @access Private

export const updatePropertyDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newImages = req.files;
  const {
    propertyName,
    propertyLocation,
    propertyAddress,
    propertyPincode,
    deletedImages,
    activeImages,
  } = req.body;

  const mergedImages = [
    ...activeImages,
    ...newImages.map((img) => {
      return `http://localhost:8000${img.destination.replace(
        /^.*?public/,
        ""
      )}/${img.filename}`;
    }),
  ];
  try {
    if (newImages.length > 0) {
      await Property.updateOne(
        { _id: id },
        {
          $set: {
            propertyName,
            propertyLocation,
            propertyAddress,
            propertyPincode,
            propertyImages: mergedImages,
          },
        }
      );
    } else {
      await Property.updateOne(
        { _id: id },
        {
          $set: {
            propertyName,
            propertyLocation,
            propertyAddress,
            propertyPincode,
            propertyImages: activeImages.length > 0 && [...activeImages],
          },
        }
      );
    }
    if (deletedImages !== undefined) {
      deletedImages.forEach(async (imgUrl) => {
        const splitName = imgUrl.split("/");
        const imgName = splitName[splitName.length - 1];
        unlink(`server/public/images/property/${imgName}`, (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw error;
  }
  res.status(200).json({ message: "basic details updated" });
});
