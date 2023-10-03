import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const providerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    brandName: {
      type: String,
    },
    brandLogo: {
      type: String,
    },
    gst: {
      type: String,
    },
    bussinessEmail: {
      type: String,
    },
    bussinessPhone: {
      type: Number,
    },
    blocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

providerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

providerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Provider = mongoose.model("Provider", providerSchema);
export default Provider;
