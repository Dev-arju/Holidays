import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";
import { getPackage } from "./packageController.js";
import {
  createOrder,
  verifyPayment,
  getOrderDetails,
} from "../utils/razorpay.js";

// @desc Create Booking and initialize payment
// route POST /api/users/new/package
// @access Private
export const createBooking = asyncHandler(async (req, res) => {
  const { startDate, packageId, form } = req.body;
  const { userId } = req;
  const { title, name, documentName, documentNumber } = form;
  try {
    const bookItem = await getPackage(packageId);
    const newBooking = await Booking.create({
      userId,
      packageId,
      startDate,
      identityProof: {
        title,
        name,
        documentName,
        documentNumber,
      },
      status: "booked",
    });
    if (!newBooking) {
      throw new Error({ message: "Booking failed" });
    }
    const order = await createOrder(newBooking._id, bookItem.price, form);
    if (order) {
      return res.status(200).json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// @desc Verify Payment
// route POST /api/users/new/package/verify
// @access Private
export const verificationHandler = asyncHandler(async (req, res) => {
  try {
    const verify = verifyPayment(req.body);
    if (!verify) {
      throw new Error("payment verification failed");
    }
    const order = await getOrderDetails(req.body.razorpay_order_id);
    if (order) {
      await Booking.updateOne(
        { _id: order.receipt },
        {
          $set: {
            isPaid: true,
            paymentInfo: req.body,
            paidAmount: order.amount / 100,
          },
        }
      );
      return res.status(200).json({ bookingId: order.receipt });
    }
    throw new Error("booking updation failed");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// @desc Send user bookings
// route GET /api/users/bookings
// @access Private
export const getUserBookings = asyncHandler(async (req, res) => {
  const { userId } = req;
  try {
    const bookings = await Booking.find({ userId, isPaid: true }).populate({
      path: "packageId",
      populate: {
        path: "provider",
        select: "brandName",
      },
    });
    if (!bookings) {
      throw new Error("your bookings not found");
    }
    return res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error?.message });
  }
});

// @desc Get all documents
// route GET /api/admin/bookings
// @access Private
export const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find().populate([
      {
        path: "userId",
        select: "-password -_id",
      },
      {
        path: "packageId",
        select: "-_id",
        populate: {
          path: "provider",
          select: "-_id -password",
        },
      },
    ]);
    if (!bookings) throw new Error("bookings not found");

    return res.status(200).json(bookings);
  } catch (error) {
    res.status(400);
    throw error;
  }
});
