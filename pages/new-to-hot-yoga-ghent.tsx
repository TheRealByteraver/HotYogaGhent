import Head from "next/head";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { GetStaticProps } from "next";
import { getContentfulEntry } from "@/services/contentful/client";

const NewToHotYogaGhent = ({
  pageTitle,
  contents,
}: {
  pageTitle: string;
  contents: any;
}) => {
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

      <MainNavigation>
        <main>
          <div className="h-fit w-full bg-emerald-900 p-2 md:p-10">
            <RichTextWrapper contents={contents} />
            <div className="h-screen"></div>
          </div>
        </main>
      </MainNavigation>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const res: any = await getContentfulEntry("4buPM5IDcrk3byRf2Ph5Tn");
  const { pageTitle, contents } = res.fields;

  return {
    props: {
      pageTitle,
      contents,
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default NewToHotYogaGhent;
