const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "***REMOVED***",
  apiSecret: "***REMOVED***",
});

export async function sendSMS(messageObject) {
  // messageObject = {
  //   from: '',
  //   to: '',
  //   text: ''
  // };
  const response = await vonage.sms.send(messageObject);
  console.log("Message sent successfully");
  console.log(response);
  return response;
}
