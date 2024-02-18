const { Vonage } = require("@vonage/server-sdk");

// const vonage = new Vonage({
//   apiKey: "***REMOVED***",
//   apiSecret: "***REMOVED***",
// });

const vonage = new Vonage({
  apiKey: "4025a7f7",
  apiSecret: "cjBhwtjYZ8yGnrgW",
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
