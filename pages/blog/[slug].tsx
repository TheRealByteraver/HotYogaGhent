import Head from "next/head";
import MainNavigation from "@/components/MainNavigation";
import {
  getContentfulEntries,
  getContentfulEntry,
} from "@/services/contentful/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import RichTextWrapper from "@/components/ui/RichTextWrapper";

const Blog = ({ blog }: { blog: any }) => {
  // console.log("blog:", blog);

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="Welcome to the website of Hot Yoga Ghent"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNavigation />
      <main>
        <div className="h-fit w-full bg-emerald-900 p-2 md:p-10 text-white">
          <h1 className="text-2xl mb-4">{blog.title}</h1>
          <em>published on {blog.createdAt}</em>         
          <RichTextWrapper contents={blog.contents} />

          <div className="h-screen"></div>
        </div>
      </main>
    </>
  );
};

const getStaticPaths = async () => {
  // we only need a list of slugs here
  const res: any = await getContentfulEntries({
    content_type: "blogPost",
    select: "fields.slug",
  });

  const { items } = res;

  return {
    // NextJs will try to generate a new page based on unknown slug
    fallback: "blocking", // don't show placeholder while page is being generated
    paths: items.map((blogPost: any) => ({
        params: {
          slug: blogPost.fields.slug,
        },
      })),
  };
};

const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug;

  const res: any = await getContentfulEntries({
    content_type: "blogPost",
    "fields.slug[match]": slug,
  });
  const { items } = res;

  // Give the user a 404 if he tries to access a non-existant blog
  if (items.length === 0) {
    return {
      notFound: true,
    }
  }

  // 'match' is not exact, i.e. 'stretch techniques' and 'Yoga and stretching' 
  // will both match the slug 'stretch', so we need to filter the result
  let item;
  if (items.length > 1) {
    item = items.filter((item: any) => item.fields.slug === slug);
  } else {
    item = items[0];
  }

  return {
    props: {
      blog: {
        createdAt: new Date(item.sys.createdAt).toLocaleString(),
        title: item.fields.blogTitle,
        url: "/blog/" + item.fields.slug,
        contents: item.fields.blogBody,
        // author: item.fields.author,
        // avatarUrl: "https:" + item.fields.avatar.fields.file.url,
        // avatarWidth: items[0].fields.avatar.fields.file.details.image.width,
        // avatarHeight: items[0].fields.avatar.fields.file.details.image.height,
      }
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticPaths, getStaticProps };

export default Blog;
