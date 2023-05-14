import Head from "next/head";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@/components/ui/Input";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import TextArea from "@/components/ui/TextArea";
import { createClient } from "contentful";
import { useRouter } from "next/router";

// same definition as in /pages/api/hello.ts
type ContactFormInputs = {
  fullName: string;
  emailAddress: string;
  message: string;
};

async function sendMail(emailData: ContactFormInputs, callback: Function) {
  const response = await fetch("/api/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  console.log("response from api after sending message:", response.status);
  callback(response.status === 200);
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
  });

  const res: any = await client.getEntry("3T7E5KfK0szuT3QTA1JiOT");
  const { contents } = res.fields;

  return {
    props: {
      contents,
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
}

export default function Contact({ contents }: { contents: any }) {
  const router = useRouter();

  // custom error messages
  const schema = yup.object().shape({
    fullName: yup.string().required("The Name field is required"),
    emailAddress: yup
      .string()
      .email("Your email address is not valid")
      .required("An email address is required"),
    message: yup
      .string()
      .required("Please leave us a short message with your question"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      emailAddress: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const [captchaValidated, setCaptchaValidated] = useState(false);

  function onCaptchaChange(value: any) {
    // if (value === true || value === false) {
      setCaptchaValidated(!!value);
    // } else {
      console.log('value in onCaptchaChange was', value);
    // } 
  }

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    if (captchaValidated) {
      console.log('sending message :)');
      // sendMail(data, (response: Boolean) => {
      //   router.push(`/home?contact=${response ? 'success' : 'fail'}`);
      // });
      router.push(`/home?contact=${true ? 'success' : 'fail'}`); // temp
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

      <MainNavigation>
        <main className="relative">
          {/* <MessageSentModal message="hello" /> */}
          <div className="h-fit w-full text-white bg-emerald-900 p-2 md:p-10">
            <RichTextWrapper contents={contents} />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full rounded-lg bg-teal-800 mt-4 p-4"
            >
              <Input
                {...register("fullName", { required: true })}
                placeholder="Enter your name here"
                label="Name"
                error={errors.fullName}
              />
              <Input
                {...register("emailAddress", { required: true })}
                placeholder="Enter your e-mail address here"
                label="Email Address"
                error={errors.emailAddress}
              />
              <TextArea
                {...register("message", { required: true })}
                placeholder="Type your message here"
                rows={5}
                label="Message"
                error={errors.message}
              />
              <div className="mt-4">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={onCaptchaChange}


                  onExpired={() => { console.log('captcha expired'); }}
                  onErrored={() => { console.log('captcha is in error state, prolly due to network error')}}

                />
              </div>
              <button
                type="submit"
                disabled={!captchaValidated}
                className="mt-4 w-40 border border-white bg-teal-600 rounded p-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </main>
      </MainNavigation>
    </>
  );
}
