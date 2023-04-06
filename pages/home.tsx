import Head from "next/head";
import Link from "next/link";

export default function Home() {
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
        <div className="p-6 border-2 border-lime-300">
          <Link className="underline" href="/new-to-hot-yoga-ghent">New to Hot Yoga Ghent?</Link>
          <br />
          <Link className="underline" href="/yoga">Yoga</Link>
          <br />
          <Link className="underline" href="/timetable">Timetable</Link>
          <br />
          <Link className="underline" href="/pricing">Pricing</Link>
          <br />
          <Link className="underline" href="/testimonials">Testimonials</Link>
          <br />
          <Link className="underline" href="/events">Events</Link>
          <br />
          <Link className="underline" href="/contact">Contact</Link>
          <br />
        </div>
      </main>
    </>
  );
}
