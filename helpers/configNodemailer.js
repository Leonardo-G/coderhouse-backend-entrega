const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_NODEMAILER_GMAIL, // generated ethereal user
    pass: process.env.PASSWORD_NODEMAILER_GMAIL, // generated ethereal password
  },
});

transporter.verify()
    .then( () => console.log("Listo en nodemailer"));

module.exports = transporter;