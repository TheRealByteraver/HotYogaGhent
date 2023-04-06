import Head from "next/head";

/*
  To add: facebook link, instagram link, map with location, instructions for bike parking
*/

export default function Contact() {
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
      </main>
    </>
  );
}
