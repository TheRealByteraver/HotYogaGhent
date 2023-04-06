import Head from "next/head";
/*
An event is:
- a title
- a date
- a description

Optional: picture? Several pictures? Markdown format?
*/

export default function Events() {
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
        <h1>Events</h1>
      </main>
    </>
  );
}
