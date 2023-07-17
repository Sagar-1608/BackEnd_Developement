require("dotenv").config();

const accountSid = process.env.ACOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
// instanse of twilio for sending message
const client = require("twilio")(accountSid, authToken);

exports.smsSender = async (req, res) => {
  try {
    const message = await client.messages.create({
      body: "Hello from sagar jadhav \n How are you?",
      from: +12056228508,
    //   to: +919356876494,
    //   to: +919156556588,
      to:+917020444858
    });
    
    console.log(message)
    res.json({
      success: true,
      message: "message sent successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error in message sending ",
    });
    console.error(err);
  }
};
