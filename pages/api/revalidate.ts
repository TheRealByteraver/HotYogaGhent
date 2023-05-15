// file pages/api/revalidate:

import { setTimeout } from "timers/promises";

// hooked as https://hot-yoga-ghent.vercel.app/api/revalidate?secret=stayhappy&page=timetable (or other page :) )
// Local: try http://localhost:3000/api/revalidate?secret=stayhappy&page=timetable

export default async function handler(req: any, res: any) {
  const { method, query } = req;
  // if the name of this file was [hello].ts instead, and you would
  // make a request to /api/identifier, then query.hello would be
  // equal to the string "identifier".

  // console.log('query = ', query);
  // console.log('body = ', req.body);
  // console.log('request type = ', method); // 'GET', 'POST', etc

  switch (method) {
    case "GET":
      // Check for secret to confirm this is a valid request
      if (query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({
          message: `Invalid token '${query.secret}', you are not allowed to revalidate page ${query.page}.`,
        });
      }

      if (
        query.page === undefined ||
        ![
          "",
          "home",
          "yoga",
          "new-to-hot-yoga-ghent",
          "timetable",
          "pricing",
          "testimonials",
          "events",
          "contact",
          "blog",
        ].includes(query.page) 
        // || !query.page.startsWith("blog/")
      ) {
        return res
          .status(401)
          .json({ message: `The page '${query.page}' does not exist` });
      }

      try {
        console.log(`Starting regeneration of page /${query.page}`);

        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate(`/${query.page}`);
        return res.json({ revalidated: true });
      } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        console.log(`revalidation of page ${query.page} failed:`, err);
        return res.status(500).send(`Error revalidating page ${query.page}`);
      }
      break;

    case "POST": // for blog posts
      // Check for secret to confirm this is a valid request
      if (query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({
          message: `Invalid token '${query.secret}', you are not allowed to revalidate page ${query.page}.`,
        });
      }

      if (
        query.page === undefined ||
        !query.page.startsWith("blog")
      ) {
        return res
          .status(401)
          .json({ message: `Please update page '/${query.page}' with a GET request, same url` });
      }

      // console.log('in POST request for revalidate, req.body:', req.body);
      // fields: {
      //   blogTitle: { 'en-US': 'This is the third blog in this awesome series' },
      //   slug: { 'en-US': 'this-is-the-third-blog-in-this-awesome-series' },
      //   blogBody: { 'en-US': [Object] }
      // }      

      const page = `/${query.page}/${req.body?.fields?.slug['en-US']}`;

      // console.log('page = ', page);

      try {
        console.log(`Starting regeneration of page ${page}`);

        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate(`/${query.page}`);
        // await setTimeout(1000); // let Vercel breathe a bit
        await res.revalidate(page);

        return res.json({ revalidated: true });
      } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        console.log(`revalidation of page ${page} failed:`, err);
        return res.status(500).send(`Error revalidating page ${page}`);
      }
      break;

    default:
      // we received a different type of request, explain that only GET and POST
      // are allowed and give feedback to the client
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
