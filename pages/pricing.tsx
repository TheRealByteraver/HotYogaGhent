import Head from "next/head";
import { createClient } from "contentful";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
  });

  const [priceTable, contents]: any = await Promise.all([
    client.getEntry("4MfYN5vANnKcdTCejiKpiF"),
    client.getEntry("4XqknYjQoHimUAyL5iwn1O"),
  ]);

  // console.log('priceTable.fields.priceListData.priceList:', priceTable.fields.priceListData.priceList);

  return {
    props: {
      priceTable: priceTable.fields.priceListData.priceList,
      contents: contents.fields.contents,
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
}

function PriceTable({ priceTable }: any) {
  /* 
{
    "priceList": [
        {
            "description": "Come and try out the first week/ 8 days",
            "price": "25 € *"
        },
        {
            "description": "Drop in",
            "price": "20 €"
        },
        {
            "description": "Month card",
            "price": "90/120 € **"
        },
        {
            "description": "10 classes card",
            "price": "130/160 € **"
        },
        {
            "description": "Year card",
            "price": "950 €"
        }
    ]
}
*/
  const cellStyle = "p-1 md:p-3 border-b border-emerald-500 ";

  return (
    <div className="border border-emerald-500 w-fit rounded-xl overflow-hidden shadow-lg shadow-teal-900 bg-gradient-to-b from-blue-500 to-purple-800">
      <table className="text-white text-left font-semibold">
        <thead>
          <tr>
            <th className={cellStyle + " bg-emerald-500"}>Membership level</th>
            <th className={cellStyle + " bg-emerald-500"}>Price</th>
          </tr>
        </thead>
        <tbody>
          {priceTable.map((membershipLevel: any, index: number) => {
            const lastRowMarkUp =
              index === priceTable.length - 1 ? "border-b-0" : "";
            return (
              <tr key={membershipLevel.description}>
                <td className={cellStyle + lastRowMarkUp}>
                  {membershipLevel.description}
                </td>
                <td className={cellStyle + lastRowMarkUp + " bg-white bg-opacity-10"}>
                  {membershipLevel.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Pricing({
  priceTable,
  contents,
}: {
  priceTable: any;
  contents: any;
}) {
  return (
    <>
      <Head>
        {/* <title>{pageTitle}</title> */}
        <meta
          name="description"
          content="Welcome to the website of Hot Yoga Ghent"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNavigation />
      <main>
        <div className="h-fit w-full pt-10 bg-emerald-900">
          <div className="w-fit block mx-auto sm:ml-4 md:ml-10">
            <PriceTable priceTable={priceTable} />
          </div>
        </div>

        <div className="h-fit w-full bg-emerald-900 p-2 md:p-10">
          <RichTextWrapper contents={contents} />
          <div className="h-screen"></div>
        </div>
      </main>
    </>
  );
}
