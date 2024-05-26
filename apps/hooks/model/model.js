const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    txnid: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    previewUrl: { type: String },
    title: { type: String, required: true },
    discountedPrice: { type: Number, required: true },
    originalPrice: { type: Number },
    shippingPrice: { type: Number, default: 0 },
    orderStatus: { type: String, default: "Pending" },
    paymentStatus: { type: Boolean, default: false },
    trackingLink: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("orders", ordersSchema);
module.exports = { OrderModel };
