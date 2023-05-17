import MainNavigation from "@/components/MainNavigation";
import TimeTable from "@/components/TimeTable";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { GetStaticProps } from "next";
import { getContentfulEntry } from "@/services/contentful/client";
import HYGHead from "@/components/HYGHead";
import { IPageFields, ITimeTableFields } from "@/@types/generated/contentful";
import { Entry } from "contentful";

// manual import is necessary or Typescript takes the wrong "Document" type
import { Document } from "../node_modules/@contentful/rich-text-types/dist/types/types";


const TimetablePage: React.FC<{
  timeTable: TimeTableWeek[];
  contents: Document | undefined;
}> = ({ timeTable, contents }) => {
  return (
    <>
      <HYGHead title="Yoga class schedule" />
      <MainNavigation>
        <main>
          <div className="h-fit w-full pt-10 bg-emerald-900">
            <div className="w-fit block mx-auto sm:ml-4 md:ml-10">
              <TimeTable timeTable={timeTable} />
            </div>
          </div>

          {/* Note: the following markdown contains an anchor tag */}
          <div className="h-fit w-full bg-emerald-900 pt-4 sm:p-2 md:p-10">
            <RichTextWrapper contents={contents} />
          </div>

          <div className="h-screen bg-emerald-900"></div>
        </main>
      </MainNavigation>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const [timeTable, contents]: [Entry<ITimeTableFields>, Entry<IPageFields>] =
    await Promise.all([
      getContentfulEntry<ITimeTableFields>("62EcBCKVbl1rdtyNsPSzLv"),
      getContentfulEntry<IPageFields>("1PwB3wyGGtYQY0Rl5dxHS4"),
    ]);

  return {
    props: {
      timeTable: timeTable.fields.timetableData.timeTable,
      contents: contents.fields.contents,
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default TimetablePage;
