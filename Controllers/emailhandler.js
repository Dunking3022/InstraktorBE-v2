// import email from 'emailjs';
const nodemailer = require("nodemailer");
const emailtemplate = require("./emailtemplate");

exports.transferMail = async (userID, userEMAIL) => {
    const verificationURL = "http://localhost:3001/pre/verify/"+userID;
  return new Promise((resolve, reject) => {
    const mail = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "treecertify@gmail.com",
        pass: "swam pacy xgjb uiwz",
      },
    });

    mail.sendMail(
      {
        from: "treecertify@gmail.com",
        to: userEMAIL,
        subject: "Instraktor: Verify your account!",
        html: emailtemplate.getHTML(verificationURL),
      },
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
};
