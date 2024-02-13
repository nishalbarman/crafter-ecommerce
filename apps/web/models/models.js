import mongoose from "mongoose";
import {
  hasOneSpaceBetweenNames,
  isValidEmail,
  isValidIndianMobileNumber,
  isValidUrl,
} from "../helpter/utils";

/****************************************** */
/**              Schema Starts             **/
/****************************************** */

const clientSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const servicesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerfied: { type: Boolean, default: false },
    emailVerifyToken: { type: String, default: "" },
    isMobileNoVerified: { type: Boolean, default: false },
    mobileNoVerifyToken: { type: String, default: "" },
    resetToken: { type: String, default: "" },
    role: { type: mongoose.Types.ObjectId, ref: "roles" }, // 0 means normal user, 1 means admin, 2 means seller
    address: { type: mongoose.Types.ObjectId, ref: "addresses", default: null },
  },
  {
    timestamps: true,
  }
);

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
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
    email: { type: String },
    mobileNo: { type: String },
    otp: { type: String, required: true },
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
  }
);

const bannerSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    altText: { type: String, required: true },
    description: { type: String, required: true },
    redirect: { type: String, required: true },
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

const feedbackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, default: 0 },
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
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

const productSchema = new mongoose.Schema(
  {
    previewUrl: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "categories" },
    discountedPrice: { type: Number, required: true },
    originalPrice: { type: Number },
    showPictures: { type: Array, required: true },
    description: { type: String, required: true },
    stars: { type: Number, default: 0 },
    totalFeedbacks: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    isSizeVaries: { type: Boolean, default: false },
    availableSizes: [{ type: mongoose.Types.ObjectId, ref: "product_size" }],
    isColorVaries: { type: Boolean, default: false },
    availableColors: [{ type: mongoose.Types.ObjectId, ref: "product_colors" }],
    shippingPrice: { type: Number, required: true, default: 49 },
  },
  {
    timestamps: true,
    query: {
      withQuery(query) {
        return this.where(query);
      },
      withPagination(query = {}, limit = 20, skip) {
        return this.where(query)
          .sort({ createdAt: "desc" })
          .skip(skip)
          .limit(limit);
      },
    },
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    product: { type: mongoose.Types.ObjectId, ref: "products" },
    quantity: { type: Number, default: 1 },
    color: { type: mongoose.Types.ObjectId, ref: "product_colors" },
    size: { type: mongoose.Types.ObjectId, ref: "product_size" },
  },
  {
    timestamps: true,
  }
);

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    product: { type: mongoose.Types.ObjectId, ref: "products" },
  },
  {
    timestamps: true,
  }
);

const orderSchema = new mongoose.Schema(
  {
    txnid: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    product: { type: mongoose.Types.ObjectId, ref: "products" },
    orderStatus: { type: String, default: "Pending" },
    paymentStatus: { type: Boolean, default: false },
    trackingLink: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const flashSaleSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "products" },
    salePrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const saleDetailsSchema = new mongoose.Schema({
  isSaleLive: { type: Boolean, default: false },
  saleEndTime: { type: Number, default: -1 },
});

// ----------------------------------------->
/****************************************** */
/**            Mongoose Models             **/
/****************************************** */
// ----------------------------------------->

const User = mongoose.models.users || mongoose.model("users", userSchema);

const Role = mongoose.models.roles || mongoose.model("roles", roleSchema);

const Otp =
  mongoose.models.registration_otp ||
  mongoose.model("registration_otp", otpSchema);

const Message =
  mongoose.models.messages || mongoose.model("messages", messageSchema);

const Banner =
  mongoose.models.banners || mongoose.model("banners", bannerSchema);

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

const Feedback =
  mongoose.models.feedbacks || mongoose.model("feedbacks", feedbackSchema);

const Cart = mongoose.models.cart || mongoose.model("cart", cartSchema);

const Wishlist =
  mongoose.models.wishlist || mongoose.model("wishlist", wishlistSchema);

const Address =
  mongoose.models.address || mongoose.model("address", addressSchema);

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

// ----------------------------------------->
/****************************************** */
/**          User Schema Validator         **/
/****************************************** */
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
/****************************************** */
/**        Messages Schema Validator       **/
/****************************************** */
// ----------------------------------------->

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

// ----------------------------------------->
/****************************************** */
/**        Banner Schema Validator         **/
/****************************************** */
// ----------------------------------------->

Banner.schema.path("imageUrl").validate({
  validator: function (value) {
    return value && isValidUrl(value);
  },
  message: "Invalid Url",
});

Banner.schema.path("redirect").validate({
  validator: function (value) {
    return value && value.includes("/");
  },
  message: "Invalid Link",
});

// ----------------------------------------->
/****************************************** */
/**        Product Schema Validator        **/
/****************************************** */
// ----------------------------------------->

Product.schema.path("previewUrl").validate({
  validator: (value) => value && isValidUrl(value),
  message: "Invalid Preview URL",
});

Product.schema.path("discountedPrice").validate({
  validator: (value) => value && !isNaN(parseFloat(value)),
  message: "Discounted Price must be number",
});

Product.schema.path("showPictures").validate({
  validator: (value) => value && value.length == 4,
  message: "Show pictures must contain atleast 4 images",
});

/***************************************** */

module.exports = {
  User,
  Message,
  Otp,
  Banner,
  Product,
  Feedback,
  Cart,
  Wishlist,
  Address,
  Order,
};
