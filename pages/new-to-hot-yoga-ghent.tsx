import Head from "next/head";
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
  });
  
  const res: any = await client.getEntry('4buPM5IDcrk3byRf2Ph5Tn');
  const { pageTitle, contents } = res.fields;
  
  return {
    props: { 
      pageTitle,
      contents,
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
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
      </main>
    </>
  );
}
