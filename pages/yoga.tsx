import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { getContentfulEntry } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import HYGHead from "@/components/HYGHead";

const Yoga = ({
  pageTitle,
  contents,
}: {
  pageTitle: string;
  contents: any;
}) => {
  return (
    <>
      <HYGHead title={pageTitle} />
      <MainNavigation />
      <main>
        <div className="h-fit w-full bg-emerald-900 p-2 md:p-10">
          <RichTextWrapper contents={contents} />
          <div className="h-screen"></div>
        </div>
      </main>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const res: any = await getContentfulEntry("6DEWIj4OveKErJpqEeeQmC");
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

export default Yoga;
