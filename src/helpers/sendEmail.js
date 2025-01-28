import nodemailer from 'nodemailer';
import path from path;
import dotenv from 'dotenv';

dotenv.config();


const __filename = path.resolve(import.meta.url);
const __dirname = path.dirname(__filename);


const sendEmail = async (subject, send_to, reply_to, template, send_from, name, link
) => {
  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    host: "smtp.office365.com",
    port:587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,  // Your Outlook email
      pass: process.env.USER_PASS,  // Your Outlook password
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  const handleBarsOptions = {
    ViewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve(__dirname, "../views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../views"),
    extName: ".hbs",
  };

  transporter.use("compile", hbs(handleBarsOptions));

  const mailOption = {
    from: send_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
template: template,
context: {
  name: name,
  link: link,
}
  };
};