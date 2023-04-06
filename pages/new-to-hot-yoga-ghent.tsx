import Head from "next/head";

export default function NewToHotYogaGhent() {
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
        <h1>Welcome</h1>
        <p>to the first Hot Yoga studio in Ghent.</p>
        <p>All our classes are beginner friendly. No stress - it&apos;s only yoga 😉.</p>
        <p>Send an email to hotyogagent@gmail.com to sign up for your starter week.</p>
        <p>Starter week:</p>
        <ul className="list-disc list-inside ml-6">
          <li>8 consecutive days of unlimited yoga</li>
          <li>1 mat and 1 towel per class included in the price of 20€</li>
        </ul>
        <p>Just want to join one class? No need to book, just drop in for 17€</p>
        <p>Be prepared to sweat.</p>
        <ul className="list-disc list-inside ml-6">
          <li>wear light & comfi clothing</li>
          <li>bring a bottle of water</li>
          <li>hydrate well 24h before class</li>
          <li>we recommend not to eat 2h before practice</li>
          <li>come 15 min before class starts</li>
          <li>we have changing rooms, showers & lockers</li>
        </ul>
        <p>All our classes are guided by certified instructors and are suitable for beginners while still challenging for advanced practitioners.</p>
        <p>Come with an open heart and mind. We are looking forward to seeing you soon @Hot Yoga Ghent</p>
      </main>
    </>
  );
}
