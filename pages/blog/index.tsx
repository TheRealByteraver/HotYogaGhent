import Head from "next/head";
import MainNavigation from "@/components/MainNavigation";
import { getContentfulEntries } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import Link from "next/link";

const Blog = ({ blogs }: { blogs: any }) => {

  // console.log('items (blogs):', blogs);

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
          <h1 className="text-2xl mb-4">Check out our blogs!</h1>
          <ul className="underline">
            {blogs.map((blog: any) => (
              <li key={blog.createdAt}>
                <Link href={blog.url}>{blog.title}</Link>
              </li>
            ))}
          </ul>

          <div className="h-screen"></div>
        </div>
      </main>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const res: any = await getContentfulEntries({ content_type: "blogPost" });
  const { items } = res;

  // console.log('items (blogs):', items);

  return {
    props: {
      blogs: items
        .map((item: any) => ({
          createdAt: new Date(item.sys.createdAt).toLocaleString(),
          title: item.fields.blogTitle,
          url: "/blog/" + item.fields.slug,
          // author: item.fields.author,
          // avatarUrl: "https:" + item.fields.avatar.fields.file.url,
          // avatarWidth: items[0].fields.avatar.fields.file.details.image.width,
          // avatarHeight: items[0].fields.avatar.fields.file.details.image.height,
        }))
        // .sort(
        //   (a: any, b: any) =>
        //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        // ),
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default Blog;
