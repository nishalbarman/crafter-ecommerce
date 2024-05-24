const axios = require("axios");

const fast2SMS = async ({ numbers, message }) => {
  try {
    const sender = "RENT-TXTLCL";
    const apiKey = "***REMOVED***";

    // const postData = JSON.stringify();

    const response = await axios.post(`https://www.fast2sms.com/dev/bulkV2`, {
      authorization:
        "***REMOVED***",
      variables_values: message,
      route: "otp",
      numbers: numbers,
    });

    console.log(response.data.messages);

    if (response.data.status === "success") {
      console.log("OTP Message sent!");
    } else {
      throw new Error("OTP send failed!");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = fast2SMS;
