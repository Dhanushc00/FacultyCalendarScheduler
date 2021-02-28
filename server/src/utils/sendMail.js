const nodemailer = require("nodemailer");
const sendMail = async (userOpts) => {
  //let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "milo.rippin95@ethereal.email",
      pass: "KpRq39wteavPbgkAsE",
    },
  });
  const output = `
  <p>You have a new account in faculty calendar scheduler</p>
  <h3>User Details</h3>
  <ul>  
    <li>Username: ${userOpts.username}</li>
    <li>Password: ${userOpts.password}</li>
  </ul>
  <h3>Message:</h3>
  <p>Please do not share this password with anyone</p>
`;
 let info=await transporter.sendMail(
    {
      from: `"Fred Foo 👻" <milo.rippin95@ethereal.email>`,
      to: userOpts.email,
      subject: "Welcome to Faculty Calendar Schedular",
      text: `Username: ${userOpts.username} , Password: ${userOpts.password}`,
      html: output,
    });
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = {
  sendMail,
};
