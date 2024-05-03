import 'dotenv/config';
import nodemailer from 'nodemailer';

const {
  SEND_UKR_NET_USER,
  SEND_UKR_NET_PASS,
  SEND_UKR_NET_HOST,
  SEND_UKR_NET_PORT,
} = process.env;

const config = {
  host: SEND_UKR_NET_HOST,
  port: SEND_UKR_NET_PORT,
  secure: true,
  auth: {
    user: SEND_UKR_NET_USER,
    pass: SEND_UKR_NET_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const sendHelp = data => {
  const email = { ...data, from: SEND_UKR_NET_USER };
  return transporter.sendMail(email);
};

export default sendHelp;
