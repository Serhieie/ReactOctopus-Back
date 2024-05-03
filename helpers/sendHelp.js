import 'dotenv/config';
import nodemailer from 'nodemailer';

const { SEND_MAIL_USER, SEND_MAIL_PASS, SEND_MAIL_HOST, SEND_MAIL_PORT } =
  process.env;

const config = {
  host: SEND_MAIL_HOST,
  port: SEND_MAIL_PORT,
  secure: true,
  auth: {
    user: SEND_MAIL_USER,
    pass: SEND_MAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const sendHelp = data => {
  const email = { ...data, from: SEND_MAIL_USER };
  return transporter.sendMail(email);
};

export default sendHelp;
