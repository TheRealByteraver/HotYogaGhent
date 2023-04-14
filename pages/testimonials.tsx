import Head from "next/head";
import Image from "next/image";
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
  });
  
  const res: any = await client.getEntries({content_type: "testimonial"});
  const { items } = res;
  /* 
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
        createdAt: (new Date(item.sys.createdAt)).toLocaleDateString(),
        text: item.fields.testimonialText,
        avatarUrl: 'https:' + item.fields.avatar.fields.file.url,
        avatarWidth: items[0].fields.avatar.fields.file.details.image.width,
        avatarHeight: items[0].fields.avatar.fields.file.details.image.height
      }))
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
      <main className="bg-white">
        <h1>Testimonials</h1>
        <ul>
        {
          props.testimonials.map((testimonial: any, index: number) => (
            <li key={testimonial.id}>
              <Image 
                src={testimonial.avatarUrl}
                width={testimonial.avatarWidth}
                height={testimonial.avatarHeight}
                alt="author's portrait"
              />
              {documentToReactComponents(testimonial.text)}
              <p>Posted on {testimonial.createdAt}</p>
            </li>
          ))
        }
        </ul>
      </main>
    </>
  );
}
