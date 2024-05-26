const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: process.env.VONTAGE_API_KEY,
  apiSecret: process.env.VONTAGE_AUTH_KEY,
});

export async function sendSMS(messageObject) {
  const response = await vonage.sms.send(messageObject);
  console.log("Message sent successfully");
  console.log(response);
  return response;
}
