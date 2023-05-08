import Head from "next/head";
// import Link from "next/link";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Table from "@/components/ui/Table";
import { classicNameResolver } from "typescript";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { useEffect, useState } from "react";

// getStaticProps() runs at *build time only*, server side
/* 
  res.revalidate('/blog/post-1') // regenerate page

  On demand revalidation:

  First, create a secret token only known by your Next.js app. This secret will 
  be used to prevent unauthorized access to the revalidation API Route. You can 
  access the route (either manually or with a webhook) with the following URL 
  structure:  

  https://<your-site.com>/api/revalidate?secret=<token>

  Next, add the secret as an Environment Variable to your application. Finally, 
  create the revalidation API Route:

  file pages/api/revalidate:

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }
 
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/path-to-revalidate');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}  

  To test on-demand regeneration: use the production build:
  In the cli, run the commands:

  next build
  next start  

*/
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
  });

  const [timeTable, contents]: any = await Promise.all([
    client.getEntry("62EcBCKVbl1rdtyNsPSzLv"),
    client.getEntry("1PwB3wyGGtYQY0Rl5dxHS4"),
  ]);

  console.log('revalidating timetable page, new content loaded from api:', timeTable.fields.timetableData.timeTable);

  // console.log("created at (minor change here):", contents.sys.createdAt);

  return {
    props: {
      timeTable: timeTable.fields.timetableData.timeTable,
      contents: contents.fields.contents,
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
}

function TimeTable({ timeTable }: any) {
  /* 
  timeTable format is like so:
  const json = {
    "timeTable": [
        {
            "startTime": "10:00",
            "monday"   : "Hot 90",
            "tuesday"  : "",
            "wednesday": "Hot 90",
            "thursday" : "",
            "friday"   : "",
            "saturday" : "",
            "sunday"   : "Hot 90"
        },
        {
            "startTime": "12:15",
            "monday"   : "",
            "tuesday"  : "",
            "wednesday": "",
            "thursday" : "",
            "friday"   : "Hot 60",
            "saturday" : "Hot 60",
            "sunday"   : ""
        },
        {
            "startTime": "17:00",
            "monday"   : "",
            "tuesday"  : "",
            "wednesday": "",
            "thursday" : "",
            "friday"   : "",
            "saturday" : "",
            "sunday"   : "Hot 90"
        },
        {
            "startTime": "18:15",
            "monday"   : "Hot 90",
            "tuesday"  : "Hot 90",
            "wednesday": "Hot 90",
            "thursday" : "Hot 90",
            "friday"   : "",
            "saturday" : "",
            "sunday"   : ""
        },
        {
            "startTime": "19:00",
            "monday"   : "",
            "tuesday"  : "",
            "wednesday": "",
            "thursday" : "",
            "friday"   : "Hot 60",
            "saturday" : "",
            "sunday"   : ""
        },
        {
            "startTime": "20:15",
            "monday"   : "Hot 60",
            "tuesday"  : "Absolute + Yin 90 min",
            "wednesday": "Hot 90",
            "thursday" : "Hot 90",
            "friday"   : "",
            "saturday" : "",
            "sunday"   : ""
        }
    ]
}
*/

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let dayIndex = new Date().getDay();

  // convert to monday as first day of the week:
  dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

  const [day, setDay] = useState(dayIndex);
  const [time, setTime] = useState((new Date).getUTCSeconds());

  // useEffect(() => {
  // }, []);


  const thStyle = "p-1 md:p-3 border-b border-emerald-500 ";
  const tdStyle = "p-1 md:p-3 border-b border-emerald-500 ";

  return (
    <div className="border border-emerald-500 w-fit rounded-xl overflow-hidden shadow-lg shadow-teal-900 bg-gradient-to-b from-indigo-500 to-teal-800">
      <p>current time (debug): {time}</p>
      <table className="text-white text-left font-semibold">
        <thead>
          <tr>
            <th className={thStyle + " bg-emerald-500 rounded-tl-md"}></th>
            {weekDays.map((dayStr, dayIdx) => (
              <th
                key={dayStr}
                className={
                  thStyle +
                  (dayIdx === day
                    ? " bg-teal-300 text-gray-600"
                    : " bg-emerald-500") +
                  (dayIdx < 6 ? " " : " rounded-tr-md")
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
                {weekDays.map((dayStr, dayIdx) => (
                  <td
                    key={dayStr}
                    className={
                      tdStyle +
                      (dayIdx === day
                        ? " bg-teal-300 text-gray-600"
                        : " bg-transparent") +
                      (dayIdx < 6 ? "" : " rounded-br-md") +
                      (isLastRow ? " border-b-0" : "")
                    }
                  >
                    {times[dayIdx]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function TimetablePage(props: any) {
  // const data = [
  //   // ["Start at", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  //   ["Start at", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   ["10:00", "Hot 90", "", "Hot 90", "", "", "", "Hot 90"],
  //   ["12:15", "", "", "", "", "Hot 60", "Hot 60", ""],
  //   ["17:00", "", "", "", "", "", "", "Hot 90"],
  //   ["18:15", "Hot 90", "Hot 90", "Hot 90", "Hot 90", "", "", ""],
  //   ["19:00", "", "", "", "", "Hot 60", "", ""],
  //   [
  //     "20:15",
  //     "Hot 60",
  //     "Absolute + Yin 90 min",
  //     "Hot 90",
  //     "Hot 90",
  //     "",
  //     "",
  //     "",
  //   ],
  // ];

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

      <main>
        <MainNavigation />

        <div className="h-fit w-full pt-10 bg-emerald-900">
          <div className="w-fit block mx-auto sm:ml-4 md:ml-10">
            <TimeTable timeTable={props.timeTable} />
          </div>
        </div>

        {/* Note: the following markdown contains an anchor tag */}
        <div className="h-fit w-full bg-emerald-900 pt-4 sm:p-2 md:p-10">
          <RichTextWrapper contents={props.contents} />
        </div>

        {/* "TailwindUI" table */}
        {/* <div className="hidden sm:block"> */}
        {/* <Table 
          data={data} 
          // title={'table title'} 
          // description={'table description'} 
        /> */}
        {/* </div> */}

        <div className="h-screen bg-emerald-900"></div>
      </main>
    </>
  );
}
