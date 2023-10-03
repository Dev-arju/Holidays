import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    providerId: {
      type: String,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    propertyLocation: {
      type: String,
      required: true,
    },
    propertyAddress: {
      type: String,
      required: true,
    },
    propertyPincode: {
      type: Number,
      required: true,
    },
    propertyImages: [],
    isAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    priceOptions: [
      {
        planName: {
          type: String,
        },
        adultsAllowed: {
          type: String,
        },
        childAllowed: {
          type: String,
        },
        planPrice: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
