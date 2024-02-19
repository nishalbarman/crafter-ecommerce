require("dotenv").config();
const express = require("express");

require("./db/dbConfig.js")(); // connect() function will be called

const app = express();
app.use(express.json());

app.use("/hook", require("./routes/crafter/razorpay/hook.routes.js"));

app.use("/*", (req, res) => {
  res.send("Hurrah! It's all working.");
});

app.listen(8000, () => {
  console.log("App is running on http://localhost:8000");
});
