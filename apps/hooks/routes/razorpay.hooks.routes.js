const mongoose = require("mongoose");
const { Router } = require("express");

const router = Router();

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

router.post("/order_success", async (req, res) => {
  try {
    console.log(req.body.payload.entity);
    const { notes: transactionId } = req.body.payload.entity;
    await OrderModel.updateMany(
      { txnid: transactionId },
      {
        paymentStatus: true,
        orderStatus: "Placed",
      }
    );

    console.log("\nNew order recieved with txn: " + transactionId + "\n");
    console.log("Details ------>", notes);

    res.status(200).json({ status: true, message: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
