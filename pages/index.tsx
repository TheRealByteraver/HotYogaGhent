// https://hot-yoga-ghent.vercel.app/

import Head from "next/head";
import Image from "next/image";
import { createClient } from 'contentful';

import logo from "../public/images/logo.png";
import Link from "next/link";

export async function getStaticProps() {
 
  // Create the Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
  });
  
  // the content_type is the _id_ from Contentful and can be found 
  // in the Contentful control panel
  const res: any = await client.getEntry('5cZrlNAQHbQFIT7vDgtxt9');
  const { landingPageTitle } = res.fields;
  
  return {
    props: { landingPageTitle },
    revalidate: 10, // regenerate the page at most every 10 seconds
  }
}

export default function Landing({landingPageTitle}: {landingPageTitle: String}) {

  return (
    <>
      <Head>
        <title>Hot Yoga Ghent</title>
        <meta
          name="description"
          content={'Welcome to the website of' + {landingPageTitle}}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white">
        <h1 className="text-center text-xl my-10">Welcome to {landingPageTitle}</h1>
        <p className="text-center">
          Click on the logo to continue to the website.
        </p>
        <Link className="block mt-16" href="/home">
          <Image
            className="block mx-auto border-2 border-lime-300"
            src={logo}
            alt=""
            priority
          />
        </Link>
      </main>
    </>
  );
}
