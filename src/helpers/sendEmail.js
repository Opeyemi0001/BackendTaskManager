import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (
  subject,
  send_to,
  reply_to,
  template,
  send_from,
  name,
  link
) => {
  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL, // Your Outlook email
      pass: process.env.EMAIL_PASS, // Your Outlook password
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  const handlebarsOptions = {
    ViewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "../views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  const mailOptions = {
    from: send_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    template: template,
    context: {
      name: name,
      link: link,
    },
  };

  try {
    const info = await transporter.sendEmail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.log("Error sending email: ", error);
    throw error;
  }
};

export default sendEmail;
