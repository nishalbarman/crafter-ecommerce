const { Router } = require("express");

const router = Router();

router.get("/order_success", (req, res) => {
  try {
    console.log("Get so its an get request");
    console.log(req.body);
    res.status(200).json({ status: true, message: error.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
});

router.get("/order_success", (req, res) => {
  try {
    console.log("Get so its an post request");
    console.log(req.body);
    res.status(200).json({ status: true, message: error.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
