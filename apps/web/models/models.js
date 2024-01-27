import mongoose from "mongoose";
import {
  hasOneSpaceBetweenNames, isValidEmail, isValidIndianMobileNumber} from "../helpter/utils";

/* schema start here*/

const clientSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: {
      mimetype: String,
      data: Buffer,
    },
    created_date: {
      name: { type: String, default: "." },
      date: { type: Date, default: Date.now },
    },
    updated_date: { type: Array, default: [] },
  },
  {
    query: {
      all() {
        return this.where({});
      },
    },
  }
);

// service schema and projects schema is same

const servicesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      mimetype: String,
      data: Buffer,
    },
    created_date: {
      name: { type: String, default: "." },
      date: { type: Date, default: Date.now },
    },
    updated_date: { type: Array, default: [] },
  },
  {
    query: {
      all() {
        return this.where({});
      },
    },
  }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerfied: { type: Boolean, default: false },
    emailVerifyToken: { type: String, default: "" },
    resetToken: { type: String, default: "" },
    role: { type: Number, default: 0 }, // 0 means normal user, 1 means admin, 2 means seller
  },
  {
    timestamps: true,
  }
);

const addressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    address_1: { type: String, required: true },
    address_2: { type: String, default: "" },
    pincode: { type: Number, required: true },
    state: { type: Boolean, default: false },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const otpSchema = new mongoose.Schema(
  {
    mobileNo: { type: String, required: true },
    otp: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// relation things of mongodb needs to be studied for cart and wishlist
const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    // productName: { type: String, required: true, unique: true },
    // mobileno: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // isEmailVerfied: { type: Boolean, default: false },
    // emailVerifyToken: { type: String, default: "" },
    // resetToken: { type: String, default: "" },
    // role: { type: Number, default: 0 }, // 0 means normal user, 1 means admin, 2 means seller
  },
  {
    timestamps: true,
  }
);

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    phone: { type: Number, required: true },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    query: {
      all() {
        return this.where({});
      },
    },
  }
);

// models --------------------------------------->
// ---------------------------------------------->

const User = mongoose.models.users || mongoose.model("users", userSchema);
const Otp =
  mongoose.models.registration_otp ||
  mongoose.model("registration_otp", otpSchema);
const Message =
  mongoose.models.messages || mongoose.model("messages", messageSchema);

// ---------------------------------------------->
// models --------------------------------------->

// User Validator Functions ---------------->
// ----------------------------------------->

User.schema.path("name").validate({
  validator: (value) => value && hasOneSpaceBetweenNames(value),
  message: "Full name required with space in between first and lastname",
});

User.schema.path("email").validate({
  validator: (value) => value && isValidEmail(value),
  message: "Email Invalid",
});

User.schema.path("email").validate({
  validator: async (value) => {
    const count = await User.findOne({ email: value }).count();
    return count === 0;
  },
  message: "Email already exist",
});

User.schema.path("mobileNo").validate({
  validator: (value) => value && isValidIndianMobileNumber(value),
  message: "MobileNo Invalid",
});

// ----------------------------------------->
// User Validator Functions ---------------->

Message.schema.path("name").validate({
  validator: function (value) {
    return value.length > 2;
  },
  message: "name required",
});

Message.schema.path("email").validate({
  validator: function (value) {
    var tester =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return value && tester.test(value);
  },
  message: "enter valid email!",
});

Message.schema.path("message").validate({
  validator: function (value) {
    return value.length > 10;
  },
  message: "Message minimum length should be 10 characters",
});

Message.schema.path("phone").validate({
  validator: function (value) {
    return value.toString().length === 10;
  },
  message: "phone number must be of 10 digit",
});

module.exports = { User, Message, Otp };
