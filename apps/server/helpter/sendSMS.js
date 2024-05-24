const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: process.env.VONTAGE_API_KEY,
  apiSecret: process.env.VONTAGE_SECRET_KEY,
});

async function sendSMS({ numbers, message }) {
  const messageObject = {
    from: "54453",
    to: numbers,
    text: message,
  };

  const response = await vonage.sms.send(messageObject);
  console.log("Message sent successfully");
  console.log(response);
  return response;
}

module.exports = sendSMS;
