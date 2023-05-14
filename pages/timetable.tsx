import Head from "next/head";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { getContentfulEntry } from "@/services/contentful/client";

const TimeTable = ({ timeTable }: any) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [dayIndex, setDayIndex] = useState(-1);

  useEffect(() => {
    let today = new Date().getDay();

    // convert to monday as first day of the week:
    today = today === 0 ? 6 : today - 1;
    setDayIndex(today);
  }, []);

  const thStyle = "p-1 md:p-3 border-b border-emerald-500 ";
  const tdStyle = "p-1 md:p-3 border-b border-emerald-500 ";

  return (
    <div className="border border-emerald-500 w-fit rounded-xl overflow-hidden shadow-lg shadow-teal-900 bg-gradient-to-b from-indigo-500 to-teal-800">
      <table className="text-white text-left font-semibold">
        <thead>
          <tr>
            <th className={thStyle + " bg-emerald-500 rounded-tl-md"}></th>
            {weekDays.map((dayStr, index) => (
              <th
                key={dayStr}
                className={
                  thStyle +
                  (index === dayIndex
                    ? " bg-teal-300 text-gray-600"
                    : " bg-emerald-500") +
                  (index < 6 ? " " : " rounded-tr-md")
                }
              >
                {dayStr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeTable.map((time: any, index: number) => {
            const isLastRow = index === timeTable.length - 1;
            const times = [
              time.monday,
              time.tuesday,
              time.wednesday,
              time.thursday,
              time.friday,
              time.saturday,
              time.sunday,
            ];
            return (
              <tr key={time.startTime}>
                <td className={tdStyle + " bg-emerald-500"}>
                  {time.startTime}
                </td>
                {weekDays.map((dayStr, index) => (
                  <td
                    key={dayStr}
                    className={
                      tdStyle +
                      (index === dayIndex
                        ? " bg-teal-300 text-gray-600"
                        : " bg-transparent") +
                      (index < 6 ? "" : " rounded-br-md") +
                      (isLastRow ? " border-b-0" : "")
                    }
                  >
                    {times[index]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TimetablePage = (props: any) => {
  return (
    <>
      <Head>
        <title>Yoga class schedule</title>
        <meta
          name="description"
          content="Welcome to the website of Hot Yoga Ghent"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNavigation>
        <main>
          <div className="h-fit w-full pt-10 bg-emerald-900">
            <div className="w-fit block mx-auto sm:ml-4 md:ml-10">
              <TimeTable timeTable={props.timeTable} />
            </div>
          </div>

          {/* Note: the following markdown contains an anchor tag */}
          <div className="h-fit w-full bg-emerald-900 pt-4 sm:p-2 md:p-10">
            <RichTextWrapper contents={props.contents} />
          </div>

          <div className="h-screen bg-emerald-900"></div>
        </main>
      </MainNavigation>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const [timeTable, contents]: any = await Promise.all([
    getContentfulEntry("62EcBCKVbl1rdtyNsPSzLv"),
    getContentfulEntry("1PwB3wyGGtYQY0Rl5dxHS4"),
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
