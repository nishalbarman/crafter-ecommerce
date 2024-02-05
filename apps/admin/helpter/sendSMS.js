const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "e80b621a",
  apiSecret: "cbIKnQclOUMG8nlC",
});

export async function sendSMS(messageObject) {
  await vonage.sms
    .send(messageObject)
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
      return resp;
    })
    // .catch((err) => {
    //   console.log("There was an error sending the messages.");
    //   console.error(err);
    // });
}
