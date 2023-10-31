import mongoose from "mongoose";

const packageSchema = mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
    packageName: {
      type: String,
      required: true,
    },
    dayCount: {
      type: Number,
      required: true,
    },
    nightCount: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    adults: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    phoneNumbers: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: [String],
      required: true,
    },
    banner: {
      type: Boolean,
    },
    dailySchedules: {
      type: [Object],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
