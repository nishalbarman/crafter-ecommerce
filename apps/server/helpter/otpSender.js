const axios = require("axios");

module.exports = async ({ numbers, message }) => {
  try {
    const sender = "RENT-TXTLCL";
    const apiKey = "***REMOVED***";

    // const postData = JSON.stringify();

    const response = await axios.post(`https://dkrner.api.infobip.com`, {
      headers: {
        Authorization:
          "App ***REMOVED***",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        messages: [
          {
            destinations: [{ to: `91${numbers}` }],
            from: "ServiceSMS",
            text: message,
          },
        ],
      },
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
