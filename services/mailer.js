const postmark = require("postmark");
const dotenv = require("dotenv");

dotenv.config();

const client = new postmark.ServerClient(process.env.API_KEY);

const sendEmail = async ({
  to,
  sender,
  subject,
  html,
  text,
}) => {
  try {
    await client.sendEmail({
      "From": sender,
      "To": to,
      "Subject": subject,
      "TextBody": text,
      "HtmlBody": html
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.sendEmail = async (args) => {
  if (process.env.NODE_ENV !== "development") {
    return Promise.resolve();
  } else {
    return sendEmail(args);
  }
};
