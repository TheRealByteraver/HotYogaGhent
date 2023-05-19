import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { getContentfulEntry } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import HYGHead from "@/components/HYGHead";
import PriceTable from "@/components/PriceTable";
import {
  IPageFields,
  IPriceListTableFields,
} from "@/@types/generated/contentful";
import { Entry } from "contentful";

// manual import is necessary or Typescript takes the wrong "Document" type
import { Document } from "../node_modules/@contentful/rich-text-types/dist/types/types";


const Pricing: React.FC<{
  priceTable: MembershipLevel[];
  contents: Document | undefined;
}> = ({ priceTable, contents }) => {
  return (
    <>
      <HYGHead title="Pricing" />
      <MainNavigation>
        <main>
          <div className="h-fit w-full pt-10 bg-emerald-900">
            <div className="w-fit block mx-auto sm:ml-4 md:ml-10">
              <PriceTable priceTable={priceTable} />
            </div>
          </div>

          <div className="h-fit w-full bg-emerald-900 p-2 md:p-10">
            {contents && <RichTextWrapper contents={contents} />}
            <div className="h-screen"></div>
          </div>
        </main>
      </MainNavigation>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const [priceTable, contents]: [
    Entry<IPriceListTableFields>,
    Entry<IPageFields>
  ] = await Promise.all([
    getContentfulEntry<IPriceListTableFields>("4MfYN5vANnKcdTCejiKpiF"),
    getContentfulEntry<IPageFields>("4XqknYjQoHimUAyL5iwn1O"),
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
