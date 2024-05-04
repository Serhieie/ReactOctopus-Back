import "dotenv/config";
import sgMail from "@sendgrid/mail";
import httpError from "./httpError.js";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const from = process.env.SEND_GRID_FROM;

export const sendEmail = (msg) => {
  const email = { ...msg, from };
  return sgMail.send(email);
};

export const sendMail = async (msg) => {
  try {
    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  } catch (error) {
    throw httpError(500, "Internal Server Error");
  }
};
