import Head from "next/head";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler } from "react-hook-form";

import Input from "@/components/ui/Input";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";

/*
  To add: facebook link, instagram link, map with location, instructions for bike parking
  sitemap ! nextjs feature
*/

// same definition as in /pages/api/hello.ts
type ContactFormInputs = {
  fullName: string,
  emailAddress: string,
  message: string,
};

async function sendMail(emailData: ContactFormInputs) {
  const response = await fetch('/api/sendMessage', {
    method: "POST", 
    // mode: "same-origin", 
    // cache: "no-cache", 
    headers: {
      "Content-Type": "application/json",
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer",
    body: JSON.stringify(emailData),
  });

  console.log('response.status:', response.status);

}

export default function Contact() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ContactFormInputs>();
  const [captchaValidated, setcaptchaValidated] = useState(false);

  function onCaptchaChange(value: any) {
    setcaptchaValidated(value);
  }

  const onSubmit: SubmitHandler<ContactFormInputs> = data => {
    if (captchaValidated) {
      sendMail(data);
    }
  };
  
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

      <MainNavigation />
      <main>
        <div className="h-fit w-full text-white bg-emerald-900 p-2 md:p-10">


          {/* <RichTextWrapper contents={contents} /> */}

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


          <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full rounded-lg bg-teal-800 mt-4 p-4">
            <Input {...register('fullName', { required: true })}
              placeholder='Enter your name here'
              label='Name'
              error={errors.fullName}
            />
            <Input {...register('emailAddress', { required: true })} 
              placeholder='Enter your e-mail address here' 
              label='Email Address'
              error={errors.emailAddress} 
            />
            <Input {...register('message', { required: true })} 
              placeholder='Type your message here'
              label='Message' 
              error={errors.message} 
            />
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={onCaptchaChange}
            />          
            <button type="submit" disabled={!captchaValidated} className="border-2 border-red-400 rounded p-2 mt-2 w-40">Send Message</button>
          </form>

          <div className="h-screen"></div>
        </div>
      </main>        

    </>
  );
}
