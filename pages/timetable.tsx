import Head from "next/head";
// import Link from "next/link";
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
  });
  
  const [timeTable, contents]: any = await Promise.all([
    client.getEntry('62EcBCKVbl1rdtyNsPSzLv'),
    client.getEntry('1PwB3wyGGtYQY0Rl5dxHS4')
  ]);

  // console.log('timeTable', timeTable);
  // console.log('contents', contents);

  return {
    props: { 
      timeTable: timeTable.fields.timetableData.timeTable,
      contents: contents.fields.contents
    },
    revalidate: 10,  // revalidate at most every 10 seconds
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
  return (
    <table>
      <thead>
        <tr className="border border-black">
          <th className="border border-black"></th>
          <th className="border border-black">Mon</th>
          <th className="border border-black">Tue</th>
          <th className="border border-black">Wed</th>
          <th className="border border-black">Thu</th>
          <th className="border border-black">Fri</th>
          <th className="border border-black">Sat</th>
          <th className="border border-black">Sun</th>
        </tr>
      </thead>
      <tbody>
        {timeTable.map((time: any) => (
          <tr key={time.startTime} className="border border-black">
            <td className="border border-black">{time.startTime}</td>
            <td className="border border-black">{time.monday}</td>
            <td className="border border-black">{time.tuesday}</td>
            <td className="border border-black">{time.wednesday}</td>
            <td className="border border-black">{time.thursday}</td>
            <td className="border border-black">{time.friday}</td>
            <td className="border border-black">{time.saturday}</td>
            <td className="border border-black">{time.sunday}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default function TimetablePage(props: any) {
  // console.log('props.timeTable:', props.timeTable);
  // console.log('props.content:', props.contents);

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
      <main className="bg-white prose">
        {/* Note: the following markdown contains an anchor tag */}
        {documentToReactComponents(props.contents)}
        <TimeTable timeTable={props.timeTable} />
      </main>
    </>
  );
}
