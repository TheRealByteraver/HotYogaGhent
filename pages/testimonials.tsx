import Head from "next/head";
import Image from "next/image";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
  });

  const res: any = await client.getEntries({ content_type: "testimonial" });
  const { items } = res;

  /* 
    items[0]: {
      metadata: { tags: [] },
      sys: {
        space: { sys: [Object] },
        id: '1TlFQ4qLLFJgJaCXWP6TMe',
        type: 'Entry',
        createdAt: '2023-05-06T15:18:54.667Z',
        updatedAt: '2023-05-06T15:18:54.667Z',
        environment: { sys: [Object] },
        revision: 1,
        contentType: { sys: [Object] },
        locale: 'en-US'
      },
      fields: {
        author: 'Miss India',
        testimonialText: { data: {}, content: [Array], nodeType: 'document' },
        avatar: { metadata: [Object], sys: [Object], fields: [Object] }
      }
    }

    items[0].sys.createdAt: 2023-04-14T14:24:47.269Z

    items[0].fields.testimonialText: {
      nodeType: 'document',
      data: {},
      content: [ { nodeType: 'paragraph', data: {}, content: [Array] } ]
    }

    items[0].fields.avatar: {
      metadata: { tags: [] },
      sys: {
        space: { sys: [Object] },
        id: '4dExE4Mszgiuvtbnw51bw5',
        type: 'Asset',
        createdAt: '2023-04-14T14:23:03.851Z',
        updatedAt: '2023-04-14T14:23:03.851Z',
        environment: { sys: [Object] },
        revision: 1,
        locale: 'en-US'
      },
      fields: {
        title: 'testimonial avatar 3',
        description: 'testimonial avatar 3',
        file: {
          url: '//images.ctfassets.net/280j53ipcahw/4dExE4Mszgiuvtbnw51bw5/573b9e413d883c3ca8a629e00afb5136/avatar3.jpg',
          details: [Object],
          fileName: 'avatar3.jpg',
          contentType: 'image/jpeg'
        }
      }
    } 
  */

  return {
    props: {
      testimonials: items.map((item: any) => ({
        id: item.sys.createdAt,
        createdAt: new Date(item.sys.createdAt).toLocaleDateString(),
        text: item.fields.testimonialText,
        author: item.fields.author,
        avatarUrl: "https:" + item.fields.avatar.fields.file.url,
        avatarWidth: items[0].fields.avatar.fields.file.details.image.width,
        avatarHeight: items[0].fields.avatar.fields.file.details.image.height,
      })),
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
}

export default function Testimonials(props: any) {
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
      <main>
        <div className="h-fit w-full text-white bg-emerald-900">
          <h1 className="w-full text-center text-3xl pt-10 pb-4">Testimonials</h1>
          
          {/* testimonial group container */}
          <ul className="w-full flex flex-row flex-wrap justify-around text-sm text-justify px-2 sm:px-4">
            {props.testimonials.map((testimonial: any) => (
              <li key={testimonial.id}>

                {/* individual testimonial container */}
                <div className="relative w-full h-fit mt-28 flex flex-col bg-teal-800 rounded-lg lg:mx-4 lg:w-[460px]">

                  {/* image container */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 aspect-square overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatarUrl}
                      width={testimonial.avatarWidth}
                      height={testimonial.avatarHeight}
                      alt="author's portrait"
                    />
                  </div>

                  <div className="pt-16 pl-2">
                    <p><em>by {testimonial.author}</em></p>
                    <p>Posted on {testimonial.createdAt}</p>
                  </div>

                  <div className="mt-2 px-2">
                    <hr />
                  </div>

                  <div className="w-full h-full p-2">
                  {/* overflow-y-scroll */}
                    <RichTextWrapper contents={testimonial.text} />
                  </div>

                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-screen bg-emerald-900"></div>
      </main>
    </>
  );
}
