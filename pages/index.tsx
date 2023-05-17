// /// <reference path="../models/value.d.ts" />
// /// <reference path="../@types/generated/contentful.d.ts" />

import HYGHead from "@/components/HYGHead";
import MainNavigation from "@/components/MainNavigation";
import MessageModal from "@/components/ui/MessageModal";
import { getContentfulEntries } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// to generate the types for the contentful entities run the script from
// the root directory of this project as shown below:
//
// c:\project_dir> npm run contentful-typescript-codegen
import { IValueFields } from "@/@types/generated/contentful";
// import { Entry } from "contentful-management";
import { EntryCollection } from "contentful";

const Home: React.FC<{ values: IValueFields[] }> = ({ values }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  // If we got redirected from the contact page, provide user with feedback
  useEffect(() => {
    // warning: router.query will be undefined initially (first render)
    if (router.query?.contact) {
      const msg = "" + router.query.contact; // force to string for typescript :s
      setMessage(
        msg === "success"
          ? "Your message was sent successfully, you will get back from us shortly. Stay tuned!"
          : "Unfortunately there was a problem sending your message, please try again later."
      );
    }
  }, [router.query?.contact]);

  const close = () => {
    setMessage("");
    router.replace("/");
  };

  return (
    <>
      <HYGHead title="Home" />
      <MainNavigation>
        <main className="relative bg-teal-600">
          {message !== "" && <MessageModal close={close} message={message} />}
          {/* picture placeholder */}
          <div className="w-full h-[440px]"></div>

          {/* Underlying banner */}
          <div className="relative w-full h-20 bg-lime-600">
            {/* container for top half circle */}
            <div className="relative -top-6 mx-auto w-72 h-8 overflow-hidden">
              <div className="absolute left-1/2 -translate-x-1/2 h-[768px] w-[768px] bg-lime-600 rounded-t-full"></div>
            </div>

            {/* container for bottom half circle */}
            <div className="relative -bottom-8 mx-auto w-52 h-7 overflow-hidden">
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[768px] w-[768px] bg-lime-600 rounded-b-full"></div>
            </div>

            <div className="absolute top-0 w-full h-full flex justify-center items-center text-white">
              {/* Put banner content here */}
              <p>Hello this is a test Text</p>
            </div>
          </div>

          {/* dark white banner with cards */}

          <div className="w-full pt-8 bg-yellow-50 flex flex-row flex-wrap justify-center text-sm font-bold text-justify text-stone-500">
            {values.map((value: IValueFields) => (
              <div
                key={value.order}
                className="w-[340px] min-w-[340px] mx-3 mb-6 p-2 border rounded-xl border-stone-500"
              >
                <div className="mx-auto w-fit h-10 p-2 underline">
                  {value.valueTitle}
                </div>
                <p>{value.valueText}</p>
              </div>
            ))}
          </div>

          {/* lime bottom banner with mandala's */}
          <div className="w-full h-64 bg-gradient-to-r from-lime-300 to-lime-700"></div>
        </main>
      </MainNavigation>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const res: EntryCollection<IValueFields> =
    await getContentfulEntries<IValueFields>({
      content_type: "value",
    });

  const { items } = res;

  return {
    props: {
      values: items
        .map((item): IValueFields => {
          return {
            order: item.fields.order,
            valueTitle: item.fields.valueTitle,
            valueText: item.fields.valueText,
          };
        })
        .sort((a: IValueFields, b: IValueFields) => a.order - b.order),
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default Home;
