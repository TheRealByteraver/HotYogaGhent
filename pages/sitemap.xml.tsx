import { getContentfulEntries } from "@/services/contentful/client";

const BASE_URL = "https://hot-yoga-ghent.vercel.app";
// const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

function generateSiteMap(slugs: string[]) {
  // Include posts dynamically:

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
     </url>
     <url>
       <loc>${BASE_URL}/yoga</loc>
     </url>
     <url>
       <loc>${BASE_URL}/new-to-hot-yoga-ghent</loc>
     </url>
     <url>
       <loc>${BASE_URL}/timetable</loc>
     </url>
     <url>
       <loc>${BASE_URL}/pricing</loc>
     </url>
     <url>
       <loc>${BASE_URL}/testimonials</loc>
     </url>
     <url>
       <loc>${BASE_URL}/events</loc>
     </url>
     <url>
       <loc>${BASE_URL}/contact</loc>
     </url>
     ${slugs.map((slug: string) => {
         return `
          <url>
            <loc>${`${BASE_URL}/${slug}`}</loc>
          </url>`;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any }) {
  // we only need a list of slugs here
  const slugData: any = await getContentfulEntries({
    content_type: "blogPost",
    select: "fields.slug",
  });

  const { items } = slugData;
  const slugs = items.map((blogPost: any) => 'blog/' + blogPost.fields.slug);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(slugs);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
