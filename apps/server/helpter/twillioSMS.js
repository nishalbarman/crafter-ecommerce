const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
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
