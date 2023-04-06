import Head from "next/head";
import Image from "next/image";

import logo from "../public/images/logo.png";
import Link from "next/link";

export default function Landing() {
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
        <h1 className="text-center text-xl my-10">Welcome to Hot Yoga Ghent</h1>
        <p className="text-center">
          Click on the logo to continue to the website.
        </p>
        <Link className="block mt-16" href="/home">
          <Image
            className="block mx-auto border-2 border-lime-300"
            src={logo}
            alt=""
          />
        </Link>
      </main>
    </>
  );
}
