import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

// remove <p> tags inside <li>: Contentful wraps the contents of every <li> in a <p> :(
export default function RichTextWrapper(props: any) {
  const renderOptions = {
    renderNode: {
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        const UnTaggedChildren = documentToReactComponents(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => children,
            [BLOCKS.LIST_ITEM]: (node, children) => children,
          },
        });

        return <li>{UnTaggedChildren}</li>;
      },
    },
  };

  return (
    // for css for markdown ("prose"), see https://tailwindcss.com/docs/typography-plugin
    // added border to make sure background color of bottom margin would be coloured by parent div
    <div className="prose prose-invert max-w-none prose-p:my-0 prose-li:my-0 prose-li::marker:text-white prose-emerald border border-transparent">
      {documentToReactComponents(props.contents, renderOptions)}
    </div>
  );
}
