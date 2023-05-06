import MainNavigation from "@/components/MainNavigation";
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
      <MainNavigation />
      <main className="bg-teal-600">
        {/* picture placeholder */}
        <div className="w-full h-[440px]">
        </div>

        {/* Underlying banner */}
        <div className="relative w-full h-20 bg-lime-600">

          {/* container for top half circle */}
          <div className="relative -top-6 mx-auto w-72 h-8 overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 h-[768px] w-[768px] bg-lime-600 rounded-t-full"></div>
          </div>

          {/* container for bottom half circle */}
          <div className="relative -bottom-8 mx-auto w-52 h-7 overflow-hidden">
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[768px] w-[768px] bg-lime-600 rounded-b-full"></div>
          </div>

          <div className="absolute top-0 w-full h-full flex justify-center items-center text-white">
            {/* Put banner content here */}
            <p>Hello this is a test Text</p>
          </div>
        </div>

        {/* dark white banner with cards */}
        <div className="w-full pt-8 bg-yellow-50 flex flex-row flex-wrap justify-around text-sm font-bold text-justify text-stone-500">

          <div className="w-[340px] min-w-[340px] mx-2 mb-7 border-2 border-red-500">
            <div className="mx-auto w-10 h-10 m-2 bg-lime-500"></div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, maiores? Molestias aut error ea doloremque.</p>
          </div>

          <div className="w-[340px] min-w-[340px] mx-2 mb-7 border-2 border-red-500">
            <div className="mx-auto w-10 h-10 m-2 bg-lime-500"></div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque magni ipsa possimus repudiandae non odit, praesentium rem quos fugiat quis soluta aspernatur placeat sit, animi quas exercitationem, illo neque consequuntur!</p>
          </div>

          <div className="w-[340px] min-w-[340px] mx-2 mb-7 border-2 border-red-500">
            <div className="mx-auto w-10 h-10 m-2 bg-lime-500"></div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, maiores? Molestias aut error ea doloremque.</p>
          </div>

          <div className="w-[340px] min-w-[340px] mx-2 mb-7 border-2 border-red-500">
            <div className="mx-auto w-10 h-10 m-2 bg-lime-500"></div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, maiores? Molestias aut error ea doloremque.</p>
          </div>

        </div>

        {/* lime bottom banner with mandala's */}
        <div className="w-full h-64 bg-gradient-to-r from-lime-300 to-lime-700">

        </div>        
      </main>
    </>
  );
}
