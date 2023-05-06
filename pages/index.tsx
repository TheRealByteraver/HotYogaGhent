// https://hot-yoga-ghent.vercel.app/

import Head from "next/head";
import Image from "next/image";
import { createClient } from "contentful";

import logo from "../public/images/logo.png";
import Link from "next/link";

export async function getStaticProps() {
  // Create the Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
  });

  // the content_type is the _id_ from Contentful and can be found
  // in the Contentful control panel
  const res: any = await client.getEntry("5cZrlNAQHbQFIT7vDgtxt9");
  const { landingPageTitle } = res.fields;

  return {
    props: { landingPageTitle },
    // revalidate: 10, // regenerate the page at most every 10 seconds
  };
}

export default function Landing({
  landingPageTitle,
}: {
  landingPageTitle: String;
}) {
  const linkColors = [
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
  ];
  const links = [
    {
      title: "New to Hot Yoga Ghent? Click me first!",
      url: "/new-to-hot-yoga-ghent",
    },
    {
      title: "Timetable",
      url: "/timetable",
    },
    {
      title: "Pricing",
      url: "/pricing",
    },
    {
      title: "Testimonials",
      url: "/testimonials",
    },
    {
      title: "Events",
      url: "/events",
    },
    {
      title: "Contact us",
      url: "/contact",
    },
  ];

  return (
    <>
      <Head>
        <title>Hot Yoga Ghent</title>
        <meta
          name="description"
          content={"Welcome to the website of" + { landingPageTitle }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen text-white text-center bg-emerald-600 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl py-5">
            Welcome to {landingPageTitle}
          </h1>
          <p>Click on the logo to continue to the website...</p>
        </div>

        <Link className="block" href="/home">
          <Image
            className="block mx-auto border-2 border-lime-300"
            src={logo}
            alt=""
            priority
          />
        </Link>

        <p>...or go directly where you need to be:</p>

        <div className="block w-full sm:static sm:w-fit sm:mx-auto">
          {links.map((link, index) => (
            <Link key={link.title} href={link.url}>
              <div
                className={`p-1.5 px-2 m-1 rounded border border-white text-white text-lg sm:inline-block sm:w-fit ${linkColors[index]}`}
              >
                {link.title}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
