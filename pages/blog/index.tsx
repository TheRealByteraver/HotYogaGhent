import MainNavigation from "@/components/MainNavigation";
import { getContentfulEntries } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import Link from "next/link";
import HYGHead from "@/components/HYGHead";
import { IBlogPostFields } from "@/@types/generated/contentful";
import { EntryCollection } from "contentful";

type Blog = {
  timestamp: number;
  createdAt: string;
  title: string;
  url: string;
};

const Blog = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <>
      <HYGHead title="Blog" />
      <MainNavigation />
      <main>
        <div className="h-fit w-full bg-emerald-900 p-2 md:p-10 text-white">
          <h1 className="text-2xl mb-4">Check out our blogs!</h1>
          <ul className="underline">
            {blogs.map((blog) => (
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
  const res: EntryCollection<IBlogPostFields> =
    await getContentfulEntries<IBlogPostFields>({ content_type: "blogPost" });
  const { items } = res;

  return {
    props: {
      blogs: items
        .map((item): Blog => {
          const timestamp = new Date(item.sys.createdAt).getTime();
          return {
            timestamp,
            createdAt: new Date(timestamp).toLocaleString(),
            title: item.fields.blogTitle,
            url: "/blog/" + item.fields.slug,
            // author: item.fields.author,
            // avatarUrl: "https:" + item.fields.avatar.fields.file.url,
            // avatarWidth: items[0].fields.avatar.fields.file.details.image.width,
            // avatarHeight: items[0].fields.avatar.fields.file.details.image.height,
          };
        })
        // Sort blogs, most recent one first
        .sort((a: Blog, b: Blog) => b.timestamp - a.timestamp),
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default Blog;
