import Head from "next/head";
// import Link from "next/link";
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Table from "@/components/ui/Table";
import { classicNameResolver } from "typescript";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
  });
  
  const [timeTable, contents]: any = await Promise.all([
    client.getEntry('62EcBCKVbl1rdtyNsPSzLv'),
    client.getEntry('1PwB3wyGGtYQY0Rl5dxHS4')
  ]);

  console.log('created at:', contents.sys.createdAt);

  return {
    props: { 
      timeTable: timeTable.fields.timetableData.timeTable,
      contents: contents.fields.contents
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
}

function TimeTable({timeTable}: any) {
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

const thStyle = 'p-1 md:p-3 border border-emerald-500 bg-emerald-500';
const tdStyle = 'p-1 md:p-3 border border-emerald-500';
  return (
    <div className="shadow-lg shadow-teal-900 w-fit mx-auto sm:ml-6 sm:mr-0 rounded-xl overflow-hidden bg-gradient-to-b from-indigo-500 to-teal-800">
      <table className="text-white text-left font-semibold">
        <thead>
          <tr>
            <th className={thStyle + ' rounded-tl-md'}></th>
            <th className={thStyle}>Mon</th>
            <th className={thStyle}>Tue</th>
            <th className={thStyle}>Wed</th>
            <th className={thStyle}>Thu</th>
            <th className={thStyle}>Fri</th>
            <th className={thStyle}>Sat</th>
            <th className={thStyle + ' rounded-tr-md'}>Sun</th>
          </tr>
        </thead>
        <tbody>
          {timeTable.map((time: any, index: number) => {
            // const isLastRow = (index === timeTable.length - 1);
            return (
              <tr key={time.startTime}>
                <td className={tdStyle + ' bg-emerald-500'}>{time.startTime}</td>
                <td className={tdStyle}>{time.monday}</td>
                <td className={tdStyle}>{time.tuesday}</td>
                <td className={tdStyle}>{time.wednesday}</td>
                <td className={tdStyle}>{time.thursday}</td>
                <td className={tdStyle}>{time.friday}</td>
                <td className={tdStyle}>{time.saturday}</td>
                <td className={tdStyle}>{time.sunday}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function TimetablePage(props: any) {

  const data = [
    // ["Start at", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    [
      "Start at",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],
    ["10:00", "Hot 90", "", "Hot 90", "", "", "", "Hot 90"],
    ["12:15", "", "", "", "", "Hot 60", "Hot 60", ""],
    ["17:00", "", "", "", "", "", "", "Hot 90"],
    ["18:15", "Hot 90", "Hot 90", "Hot 90", "Hot 90", "", "", ""],
    ["19:00", "", "", "", "", "Hot 60", "", ""],
    ["20:15", "Hot 60", "Absolute + Yin 90 min", "Hot 90", "Hot 90", "", "", ""]
  ];  

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

      {/* for css for markdown ("prose"), see https://tailwindcss.com/docs/typography-plugin */}
      <main>
        {/* Note: the following markdown contains an anchor tag */}
        <div className="bg-white prose">
          {documentToReactComponents(props.contents)}
        </div>

        {/* Own table */}
        <TimeTable timeTable={props.timeTable} />

        {/* "TailwindUI" table */}
        {/* <div className="hidden sm:block"> */}
          <Table 
            data={data} 
            // title={'table title'} 
            // description={'table description'} 
          />
        {/* </div> */}
        <p>-</p>
      </main>
    </>
  );
}
