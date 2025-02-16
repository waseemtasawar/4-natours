/*global require,  process, module */

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create a trnasporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the EMail Options

  const mailOptions = {
    from: 'Waseem Tasawar <waseemtasawar96@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendEmail(mailOptions);
};

module.exports = sendEmail;
