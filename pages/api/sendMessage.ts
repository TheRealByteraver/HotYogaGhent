// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "contentful";
import { IContactFormDestinationEMailAddressFields } from "@/@types/generated/contentful";
import { Entry } from "contentful";
import { getContentfulEntry } from "@/services/contentful/client";

const nodemailer = require("nodemailer");

const sendMessage = async (messageData: ContactFormInputs) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER_NAME,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME || "",
      pass: process.env.SMTP_PASSWORD || "",
    },
  });

  // the content_type is the _id_ from Contentful and can be found
  // in the Contentful control panel
  const res: Entry<IContactFormDestinationEMailAddressFields> =
    await getContentfulEntry<IContactFormDestinationEMailAddressFields>(
      "28VFltyu4kgFL7N1VR5TnZ"
    );
  const { emailAddress } = res.fields;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Hot Yoga Ghent Contact Form" ${messageData.emailAddress}`, // sender address
    // to: process.env.CONTACTFORM_RECIPIENT, // list of receivers
    to: emailAddress,
    // Subject line
    subject: "Message from the Hot Yoga Ghent Contact Form",
    // plain text body
    text: `Dear Karel 
          
          Please consider the following message sent by:
          Name: ${messageData.fullName}
          Email address: ${messageData.emailAddress}

          Simply reply to the message to answer the customer.
          (Sent by the Contact Form of the Hot Yoga Ghent website)

          ---------------------------------------------------------------------
          ${messageData.message}
          ---------------------------------------------------------------------`,
    // html body
    html: `
        <h3>Dear Karel</h3> 
        <main>      
          <p>Please consider the following message sent by:</p>
          <ul>
            <li>Name: ${messageData.fullName}</li>
            <li>Email address: ${messageData.emailAddress}</li>
          </ul>

          <p>Simply reply to the message to answer the customer.</p>
          <p><em>Sent by the Contact Form of the Hot Yoga Ghent website.</em></p>
          <hr>
          <blockquote>${messageData.message}</blockquote>
          <hr>
        </main>`,
  });
  console.log("Message sent: %s", info.messageId);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  // if the name of this file was [hello].ts instead, and you would
  // make a request to /api/identifier, then query.hello would be
  // equal to the string "identifier".

  // console.log('query = ', query);
  // console.log('body = ', req.body);
  // console.log('request type = ', method); // 'GET', 'POST', etc

  switch (method) {
    case "GET":
      res.status(200).json({ feedback: "GET request successfull" });
      break;

    case "POST":
      const response: any = await sendMessage({
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        message: req.body.message,
      });

      if (response?.status === "ok") {
        res.status(200).json({ response: "POST successful" });
      } else {
        res.status(200).json({ response: "POST failed" });
      }
      break;

    default:
      // we received a different type of request, explain that only GET and POST
      // are allowed and give feedback to the client
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
};

export default handler;
