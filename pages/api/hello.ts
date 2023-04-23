// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const nodemailer = require("nodemailer");

async function sendMessage(messageData: any) {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER_NAME,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Hot Yoga Ghent Contact Form" ${messageData.replyTo}`, // sender address
    to: process.env.CONTACTFORM_RECIPIENT, // list of receivers
    subject: "Message from the Hot Yoga Ghent Contact Form", // Subject line
    text: `Dear Karel 
          
          Please consider the following message sent by ${messageData.replyTo}. 
          Simply reply to the message to answer the customer.
          (Sent by the Contact Form of the Hot Yoga Ghent website)

          ---------------------------------------------------------------------
          ${messageData.text}
          ---------------------------------------------------------------------`, // plain text body
    html: `
        <h3>Dear Karel</h3> 
        <main>      
          <p>Please consider the following message sent by ${messageData.replyTo}. 
          Simply reply to the message to answer the customer.</p>
          <p><em>Sent by the Contact Form of the Hot Yoga Ghent website.</em></p>
          <hr>
          <blockquote>${messageData.text}</blockquote>
          <hr>
        </main>`, // html body
  });
  // console.log("Message sent: %s", info.messageId);
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  // if the name of this file was [hello].ts instead, and you would
  // make a request to /api/identifier, then query.hello would be 
  // equal to the string "identifier".

  // console.log('query = ', query); 
  // console.log('body = ', req.body); 
  // console.log('request type = ', method); // 'GET', 'POST', etc

  switch(method) {
    case 'GET':
      res.status(200).json({ feedback: 'GET request successfull' });
      break;

    case 'POST':
      const response: any = await sendMessage({
        replyTo: req.body.replyTo,
        text: req.body.text,
      });

      if (response?.status === 'ok') {
        res.status(200).json({ response: 'POST successful' });
      } else {
        res.status(200).json({ response: 'POST failed' });
      }      
      break;

    default: 
      // we received a different type of request, explain that only GET and POST 
      // are allowed and give feedback to the client
      res.setHeader('Allow', ['GET', 'POST']);        
      res.status(405).end(`Method ${method} is not allowed`);
    }
}
