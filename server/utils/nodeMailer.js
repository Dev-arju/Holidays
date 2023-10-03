import { google } from "googleapis";
import nodemailer from "nodemailer";

export default async function sendMail(email, url) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "arjunsajeevan369@gmail.com",
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "Heaven Holidays 🌍 <arjunsajeevan369@gmail.com>",
      to: `${email}`,
      subject: "Reset Password",
      text: `Reset Your Provider Account Password\n follow this link ${url}`,
      html: `<h2>Reset provider account password</h2><a style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;" href=${url} target="_blank">Click here</a>`,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
