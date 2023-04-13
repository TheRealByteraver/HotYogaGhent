import Head from "next/head";
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
  });
  
  const res: any = await client.getEntry('4XqknYjQoHimUAyL5iwn1O');
  const { pageTitle, contents } = res.fields;
  
  return {
    props: { 
      pageTitle,
      contents,
    },
    revalidate: 10,  // revalidate at most every 10 seconds
  };
}

export default function Pricing({pageTitle, contents}: {pageTitle: String, contents: any}) {
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

      
        {/* <ul>
          <li>Starter: Come and try out the first week/ 7 days for 25 € *</li>
          <li>Drop in: 20 €</li>
          <li>Monthly card: 90/120** €</li>
          <li>10 classes card: 130/160** €</li>
          <li>Year card: 950 €</li>
        </ul>
        <p>*Towels and mat are included</p>
        <p>**Discount price for students and seniors</p>
        <p><strong>All subscription types are non refundable.</strong></p> */}
        
      </main>
    </>
  );
}