import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import crypto from "crypto";

const paymentInstance = new Razorpay({
  key_id: process.env.PAYMENT_KEY_ID,
  key_secret: process.env.PAYMENT_KEY_SECRET,
});

export const createOrder = (bookingId, amount, notes) => {
  return new Promise((resolve, reject) => {
    paymentInstance.orders.create(
      {
        amount: amount * 100,
        currency: "INR",
        receipt: bookingId,

        notes: { ...notes },
      },
      (err, order) => {
        if (err) {
          reject(err);
        }
        resolve(order);
      }
    );
  });
};

export const verifyPayment = ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
}) => {
  const hmac = crypto.createHmac("sha256", process.env.PAYMENT_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");
  if (generated_signature === razorpay_signature) {
    return true;
  }
  return false;
};

export const getOrderDetails = async (orderId) => {
  try {
    const order = await paymentInstance.orders.fetch(orderId);
    if (!order) {
      throw new Error("order details not found");
    }
    return order;
  } catch (error) {
    return error;
  }
};
