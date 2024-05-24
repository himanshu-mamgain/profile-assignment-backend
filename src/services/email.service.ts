import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { MailOptions } from "nodemailer/lib/json-transport";

const mailService = process.env.MAIL_SERVICE;
const user = process.env.USER;
const pass = process.env.PASS;

export const sendMail = (
  mailOptions: MailOptions
): Promise<SMTPTransport.SentMessageInfo> => {
  try {
    const transporter = nodemailer.createTransport({
      service: mailService,
      auth: {
        user: user,
        pass: pass,
      },
    });

    return transporter.sendMail(mailOptions);
  } catch (err: any) {
    throw new Error(err?.message);
  }
};
