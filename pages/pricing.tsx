import Head from "next/head";

export default function Pricing() {
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
        <ul>
          <li>Starter: Come and try out the first week/ 7 days for 25 € *</li>
          <li>Drop in: 20 €</li>
          <li>Monthly card: 90/120** €</li>
          <li>10 classes card: 130/160** €</li>
          <li>Year card: 950 €</li>
        </ul>
        <p>*Towels and mat are included</p>
        <p>**Discount price for students and seniors</p>
        <p><strong>All subscription types are non refundable.</strong></p>
        
      </main>
    </>
  );
}