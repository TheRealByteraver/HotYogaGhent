import Head from "next/head";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

/*
  To add: facebook link, instagram link, map with location, instructions for bike parking
  sitemap ! nextjs feature
*/

async function sendMail(emailData: any) {
  const response = await fetch('/api/hello', {
    method: "POST", 
    // mode: "same-origin", 
    // cache: "no-cache", 
    headers: {
      "Content-Type": "application/json",
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer",
    body: JSON.stringify({
      // replyTo: "erland.vo@telenet.be", // filled in by the user
      // text: "<script>alert('hello there')</script>Hey, ik zou graag NOG meer hot yoga lessen volgen", // plain text body
      replyTo: emailData.replyTo,
      text: emailData.text
    }), 
  });

  console.log('response.status:', response.status);

}

export default function Contact() {
  const [captchaValidated, setcaptchaValidated] = useState(false);

  function onCaptchaChange(value: any) {
    setcaptchaValidated(value);
  }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('event', event);  
  
    if (captchaValidated) {
      console.log('sending message!');
      // sendMail({
      //   replyTo: "erland.vo@telenet.be",
      //   text: "<script>alert('hello there')</script>Hey, ik zou graag NOG meer hot yoga lessen volgen"
      // });  
    }
  }
  
  return (
    <>
      <Head>
        <title>Hot Yoga Ghent</title>
        <meta
          name="description"
          content="Welcome to the website of Hot Yoga Ghent"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white">
        <h1>Contact</h1>
        <h2>Visit us</h2>
        <address>
          Hot Yoga Gent, Nederkouter 113A, 9000 Gent
        </address>
        <h2>Contact us</h2>
        <p>By phone: +32 (0)493 59 99 63</p>
        <p>By mail: hotyogagent@gmail.com</p>
        <p>On Facebook: Hot Yoga Gent</p>
        <h2>Send us a message</h2>
        <form onSubmit={submitHandler} className="flex flex-col w-full border border-black mt-4 p-4">
          <label htmlFor="fullName">Name</label>
          <input type="text" name="fullName" id="fullName" className="border border-black " />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" className="border border-black" />
          <label htmlFor="messageBody">Message</label>
          <textarea id="messageBody" name="messageBody" rows={5} cols={33} className="border border-black mb-2"></textarea>
          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_SITE_KEY || ''}
            onChange={onCaptchaChange}
          />          
          <button type="submit" disabled={!captchaValidated} className="border-2 border-red-400 rounded p-2 mt-2 w-40">Send Message</button>
        </form>
      </main>
    </>
  );
}
