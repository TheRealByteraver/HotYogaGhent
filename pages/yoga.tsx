import Head from "next/head";

export default function Yoga() {
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
        <h1>Yoga</h1>
        <h2>Hot 90</h2>
        <p>
          A therapeutic hatha yoga sequence of 26 postures (2 breathing
          exercises) practised in a heated room over 90min. (+- 40 degrees °C &
          50% humidity)
        </p>
        <h2>Hot 60</h2>
        <p>A very intense 60 minutes version of our Hot 90 class.</p>
        <h2>Hot Yin & Yang</h2>
        <p>
          A heated 90min class that blends two styles of yoga into one practice
          - bringing together the benefits of more dynamic postures and a slower
          practice where poses are held passively, working on the deep
          connective tissue in the body.
        </p>
        <h2>Hot Yoga Benefits</h2>
        <ul className="list-disc list-inside ml-6">
          <li>improves breathing</li>
          <li>stress release</li>
          <li>increases blood flow</li>
          <li>strengthens the immune system</li>
          <li>improves mobility, balance & strength</li>
          <li>boosts the mood</li>
          <li>promotes healing</li>
          <li>improves focus & determination</li>
          <li>detoxification</li>
          <li>increased energy</li>
          <li>improves general health & well-being</li>
        </ul>
      </main>
    </>
  );
}
