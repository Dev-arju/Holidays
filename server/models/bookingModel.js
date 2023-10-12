import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    identityProof: {
      title: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      documentName: {
        type: String,
        required: true,
      },
      documentNumber: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentInfo: {
      type: Object,
    },
    paidAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
