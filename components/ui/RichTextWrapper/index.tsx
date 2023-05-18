import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";

// manual import is necessary or Typescript takes the wrong "Document" type
import { Document } from "../../../node_modules/@contentful/rich-text-types/dist/types/types";

const RichTextWrapper: React.FC<{ contents: Document }> = ({ contents }) => {
  const replaceHyperLink = (node: any, children: any) => {
    // console.log('link object:', node);
    // this works, but ideally one should check if the link is to an external
    // site, and if so render a simple <a> tag instead of a <Link> function.
    return <Link href={node.data.uri}>{node.content[0].value}</Link>;
  };

  const renderOptions = {
    renderNode: {
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        const UnTaggedChildren = documentToReactComponents(node, {
          renderNode: {
            [INLINES.HYPERLINK]: replaceHyperLink,
            [BLOCKS.PARAGRAPH]: (node, children) => children,
            [BLOCKS.LIST_ITEM]: (node, children) => children,
          },
        });
        return <li>{UnTaggedChildren}</li>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <div className="border rounded overflow-hidden w-fit">
          <Image
            className="m-0"
            src={"https:" + node.data?.target?.fields?.file?.url}
            alt={node.data?.target?.fields?.title}
            width={node.data?.target?.fields?.file?.details?.image?.width}
            height={node.data?.target?.fields?.file?.details?.image?.height}
          />
        </div>
      ),
      [INLINES.HYPERLINK]: replaceHyperLink,
      // [INLINES.ENTRY_HYPERLINK]: (node: any) => (
      //   <span>this entry hyperlink was replaced</span>
      // ),
      // [INLINES.ASSET_HYPERLINK]: (node: any) => (
      //   <span>this asset hyperlink was replaced</span>
      // ),
      // [INLINES.EMBEDDED_ENTRY]: (node: any) => (
      //   <span>this embedded entry was replaced</span>
      // ),
    },
  };

  return (
    // for css for markdown ("prose"), see https://tailwindcss.com/docs/typography-plugin
    // added border to make sure background color of bottom margin would be coloured by parent div
    <div className="prose prose-invert max-w-none prose-p:my-0 prose-li:my-0 prose-li::marker:text-white prose-emerald border border-transparent">
      {documentToReactComponents(contents, renderOptions)}
    </div>
  );
};

export default RichTextWrapper;
