import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { getContentfulEntry } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import HYGHead from "@/components/HYGHead";
import PriceTable from "@/components/PriceTable";

const Pricing = ({
  priceTable,
  contents,
}: {
  priceTable: any;
  contents: any;
}) => {
  return (
    <>
      <HYGHead title='Pricing' />
      <MainNavigation>
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
      </MainNavigation>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const [priceTable, contents]: any = await Promise.all([
    getContentfulEntry("4MfYN5vANnKcdTCejiKpiF"),
    getContentfulEntry("4XqknYjQoHimUAyL5iwn1O"),
  ]);

  return {
    props: {
      priceTable: priceTable.fields.priceListData.priceList,
      contents: contents.fields.contents,
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default Pricing;
