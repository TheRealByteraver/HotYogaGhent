import MainNavigation from "@/components/MainNavigation";
import { getContentfulEntries } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MessageModal = (props: any) => {
  return (
    <div className="absolute z-10 w-full h-full bg-gray-900 bg-opacity-70 flex flex-col flex-nowrap justify-center items-center">
      <div className="border border-white rounded w-4/5 bg-emerald-900 bg-opacity-80 shadow shadow-emerald-900 text-white p-4">
        <h2 className="text-3xl mt-2 mb-4 text-center">Thank you!</h2>
        <p className="my-8 text-center leading-7">{props.message}</p>
        <button
          className="block mx-auto mt-3 mb-2 px-8 py-2 border-2 rounded border-white bg-teal-600"
          onClick={() => {
            props.close();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const Home = (props: any) => {
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
    router.replace("/home");
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Welcome to the website of Hot Yoga Ghent"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            {props.values.map((value: any) => (
              <div
                key={value.order}
                className="w-[340px] min-w-[340px] mx-3 mb-6 p-2 border rounded-xl border-stone-500"
              >
                <div className="mx-auto w-fit h-10 p-2 underline">
                  {value.title}
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
  const res: any = await getContentfulEntries({ content_type: "value" });
  const { items } = res;

  return {
    props: {
      values: items
        .map((item: any) => ({
          order: item.fields.order,
          title: item.fields.valueTitle,
          valueText: item.fields.valueText,
        }))
        .sort((a: any, b: any) => +a.order - +b.order),
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default Home;
