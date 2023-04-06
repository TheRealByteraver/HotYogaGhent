import Head from "next/head";
import Link from "next/link";


function TimeTable() {
  const times = [
    // array monday - sunday
    // arrays of time + yoga types for every day of the week:
    // Time | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday| Sunday
    ["10:00", "Hot 90", "", "Hot 90", "", "", "", "Hot 90"],
    ["12:15", "", "", "", "", "Hot 60", "Hot 60", ""],
    ["17:00", "", "", "", "", "", "", "Hot 90"],
    ["18:15", "Hot 90", "Hot 90", "Hot 90", "Hot 90", "", "", ""],
    ["19:00", "", "", "", "", "Hot 60", "", ""],
    [
      "20:15",
      "Hot 90",
      "Absolute + Yin 90 min",
      "Hot 90",
      "Hot 90",
      "",
      "",
      "",
    ],
  ];

  return (
    <table>
      <thead>
        <tr className="border border-black">
          <th></th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
        {times.map((time) => (
          <tr key={time[0]}>
            {time.map((cell, index) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default function TimetablePage() {
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
      <main className="bg-white">
        <ul>
          <li>
            Studio opens 20min before class and closes 5min before class. After
            class, you have 30min to shower and dress up.
          </li>
          <li>
            New to <Link href="/new-to-hot-yoga-ghent">Hot Yoga Ghent?</Link>
          </li>
        </ul>
        <TimeTable />
      </main>
    </>
  );
}
