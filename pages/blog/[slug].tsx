import MainNavigation from "@/components/MainNavigation";
import { getContentfulEntries } from "@/services/contentful/client";
import { GetStaticProps } from "next";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import HYGHead from "@/components/HYGHead";

const Blog = ({
  blog,
}: {
  blog: {
    contentfulId: string;
    createdAt: string;
    title: string;
    url: string;
    contents: object;
  };
}) => {
  // reload the blog after the initial load just to be sure to get the most
  // recent data. I had to make a separate api endpoint for this, that will 
  // only revalidate blogs, without secret token. What else could I do when 
  // Vercel can't handle two consecutive refreshes in a row? This solution 
  // is far from ideal, because now every visit of a blog page by about 
  // anybody will cause a revalidation of that very page.
  // This solution was abandoned in favor of automatic revalidation with an
  // interval of one hour.

  // Note: issue was now "solved" by implementing a second webhook that fires
  // with the same criteria (blogPost "publish" event in Contentful)

  // useEffect(() => {
  //   const refreshBlogPost = async () => {
  //     fetch(
  //       "http://localhost:3000/api/revalidateBlogPost?page=" + blog.url
  //     ).then((result) => {
  //       console.log(result);
  //     });
  //   };
  //   refreshBlogPost();
  // }, [blog.url]);

  return (
    <>
      <HYGHead title={blog.title} />
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

  // Give the user a 404 if he tries to access a non-existent blog
  if (items.length === 0) {
    return {
      notFound: true,
    };
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
        contentfulId: item.sys.id,
        createdAt: new Date(item.sys.createdAt).toLocaleString(),
        title: item.fields.blogTitle,
        url: "blog/" + item.fields.slug,
        contents: item.fields.blogBody,
        // author: item.fields.author,
        // avatarUrl: "https:" + item.fields.avatar.fields.file.url,
        // avatarWidth: items[0].fields.avatar.fields.file.details.image.width,
        // avatarHeight: items[0].fields.avatar.fields.file.details.image.height,
      },
    },
    // revalidate at most every hour. Not ideal, but I don't see any other 
    // solution as for now, as Vercel can't handle two page regenerations 
    // in a row.
    revalidate: 3600, 
  };
};

export { getStaticPaths, getStaticProps };

export default Blog;
