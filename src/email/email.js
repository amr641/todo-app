import nodemailer from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken";
import { catchError } from "../middlewares/errors/catchError.js";
export const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amrgad395@gmail.com",
      pass: "lcqaskmrnstaetzu",
    },
  });
  jwt.sign(
    { email: email },
    "awq",
    catchError(async (error, token) => {
      const info = await transporter.sendMail({
        from: '"To Do App" <amrgad395@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "email confirmation ✔", // Subject line
        text: "Hello world?", // plain text body
        html: template(token),
        // html body
      });
      console.log("Message sent: %s", info.messageId);
    })
  );
};
