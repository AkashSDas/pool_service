import { NextApiRequest, NextApiResponse } from "next";
import * as nodemailer from "nodemailer";

interface ReqBody {
  name: string;
  email: string;
  message: string;
}

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message } = <ReqBody>req.body;

  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: process.env.EMAIL_ADDRESS,
    from: process.env.EMAIL_ADDRESS,
    subject: "Pool Service",
    html: `
      <p>You have a message</p>
      <h3>Contact Details</h3>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <h3>Message</h3>
      <p>${message}</p>
    `,
  };

  smtpTransport.sendMail(mailOptions, (err, _data) => {
    if (err) return res.json({ error: true, success: false });
    res.json({ error: false, success: true });
  });
}
