import Head from "next/head";
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
  });
  
  const res: any = await client.getEntry('6DEWIj4OveKErJpqEeeQmC');
  const { pageTitle, contents } = res.fields;
  
  return {
    props: { 
      pageTitle,
      contents,
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
}

export default function Yoga({pageTitle, contents}: {pageTitle: String, contents: any}) {
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

      <MainNavigation />
      <main>
        <div className="h-fit w-full bg-emerald-900 p-2 md:p-10">
          <RichTextWrapper contents={contents} />
          <div className="h-screen"></div>
        </div>
      </main>      
    </>
  );
}
