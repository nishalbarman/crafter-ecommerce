const accountSid = "***REMOVED***";
const authToken = "***REMOVED***";
const client = require("twilio")(accountSid, authToken);

const twillioSendSMS = async ({ numbers, message }) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: "whatsapp:",
      to: "whatsapp:",
    });

    console.log(response.data.sid);
  } catch (error) {
    throw error;
  }
};

module.exports = twillioSendSMS;
