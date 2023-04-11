import Head from "next/head";
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
});

export async function getStaticProps() {
  const res: any = await client.getEntry('4buPM5IDcrk3byRf2Ph5Tn');
  const { pageTitle, contents } = res.fields;
  
  return {
    props: { 
      pageTitle,
      contents,
    },
    revalidate: 10,  // revalidate at most every 10 seconds
  };
}


export default function NewToHotYogaGhent({pageTitle, contents}: {pageTitle: String, contents: any}) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Welcome to the website of Hot Yoga Ghent"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* for css for markdown ("prose"), see https://tailwindcss.com/docs/typography-plugin */}
      <main className="bg-white prose">

        {documentToReactComponents(contents)}

        {/* <h1>Welcome</h1>
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
        <p>Come with an open heart and mind. We are looking forward to seeing you soon @Hot Yoga Ghent</p> */}

      </main>
    </>
  );
}
