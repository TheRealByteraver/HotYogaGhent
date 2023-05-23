import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { getContentfulEntry } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import HYGHead from "@/components/HYGHead";
import { IPageFields } from "@/@types/generated/contentful";
import { Entry } from "contentful";

// manual import is necessary or Typescript takes the wrong "Document" type
import { Document } from "../node_modules/@contentful/rich-text-types/dist/types/types";

const Yoga: React.FC<{
  pageTitle: string;
  contents: Document | undefined;
}> = ({ pageTitle, contents }) => {
  return (
    <>
      <HYGHead title={pageTitle} />
      {/* <MainNavigation /> */}
      <main>
        <div className="w-full p-2 h-fit bg-emerald-900 md:p-10">
          {contents && <RichTextWrapper contents={contents} />}
          <div className="h-screen"></div>
        </div>
      </main>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const res: Entry<IPageFields> = await getContentfulEntry<IPageFields>(
    "6DEWIj4OveKErJpqEeeQmC"
  );
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
