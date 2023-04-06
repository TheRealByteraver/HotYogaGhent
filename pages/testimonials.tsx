import Head from "next/head";
/*
A testimonial is:
- a user (grab his avatar?)
- a description (the testimonial)
- the date of posting
*/

export default function Testimonials() {
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
        <h1>Testimonials</h1>
      </main>
    </>
  );
}
