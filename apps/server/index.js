// const dotEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const cookieParser = require("cookie-parser");

// dotEnv.config();
const dbConnect = require("./config/dbConfig");

dbConnect(); // connect to databse

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 3600, // Limit each IP to 3600 requests per `window` (here, per 1 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  message: { message: "Take a break dear, you sending too much requests." },
});

const app = express();

const extractToken = async (req, res, next) => {
  try {
    console.log(req.url);

    const publicRoute =
      req.url === "/" ||
      req.url === "/helloworld" ||
      req.url === "/auth/admin-login" ||
      req.url === "/auth/login" ||
      req.url === "/auth/signup" ||
      req.url === "/auth/sendOtp" ||
      req.url === "/hook/razorpay" ||
      req.url === "/stripe/hook" ||
      req.url === "/get-image-bg-color" ||
      req.url === "/categories/view/:categoryId" ||
      req.url === "/orders/get-order-chart-data";

    if (publicRoute) {
      return next();
    }

    const token = req.cookies;
    console.log("Token", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    req.jwt = { token: token };

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Some unkown error occured!" });
  }
};

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());

// payment hooks
/!* these route need raw json data so thats why placing it before experss.json() *!/;
app.use("/stripe/hook", require("./hooks/stripe-hook.routes"));

app.use(limiter);
app.use(express.json({ limit: "50mb" }));

app.use(extractToken);

app.use("/user", require("./routes/users/user.routes"));
app.use("/auth", require("./routes/auth/authentication.routes"));
app.use("/auth/signup", require("./routes/auth/authentication.routes"));
app.use("/auth/sendOtp", require("./routes/otpSend/mobile.routes"));
app.use("/categories", require("./routes/categories/category.routes"));
app.use("/products", require("./routes/products/products.routes"));
app.use("/wishlist", require("./routes/wishlist/wishlist.routes"));
app.use("/cart", require("./routes/cart/cart.routes"));
app.use("/address", require("./routes/address/address.routes"));
app.use("/feedbacks", require("./routes/feedbacks/feedbacks.routes"));
app.use("/orders", require("./routes/order/order.routes"));

app.use("/colors", require("./routes/colors/color.routes"));
app.use("/size", require("./routes/sizes/sizes.routes"));

// center related routes
app.use("/center", require("./routes/centers/center.routes"));

// hooks
app.use("/hook/razorpay", require("./hooks/razorpay-hook.routes"));

// stripe payment gateway
/!* ---- paytm */;
app.use("/paytm/cart", require("./routes/payment/paytm/pay-cart.routes"));

/!*---- razorpay */;
app.use(
  "/pay/razorpay/cart",
  require("./routes/payment/razorpay/pay-cart.routes")
);

/!* ---- stripe */;
app.use("/stripe/cart", require("./routes/payment/stripe/pay-cart.routes"));
app.use(
  "/stripe/single/purchase",
  require("./routes/payment/stripe/pay-single.routes")
);

// payment summary
app.use("/payment/summary", require("./routes/payment/summary.routes"));

//shiprocket
app.use("/shiprocket/track", require("./routes/shiprocket/track.routes"));

//firebase
app.use("/firebase", require("./routes/firebase/firebase.routes"));

app.use(
  "/image-bg-color",
  require("./routes/image-bg-color/imageColor.routes")
);

app.get("/helloworld", (_, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
