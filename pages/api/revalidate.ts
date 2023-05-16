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
        !(
          [
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
          ].includes(query.page) || query.page.startsWith("blog/")
        )
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

    // https://vercel.com/templates/next.js/nextjs-blog-preview-mode

    case "POST": // for blog posts
      // Check for secret to confirm this is a valid request
      if (query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({
          message: `Invalid token '${query.secret}', you are not allowed to revalidate page ${query.page}.`,
        });
      }

      if (query.page === undefined || query.page !== "blog") {
        return res.status(401).json({
          message: `Please update page '/${query.page}' with a GET request, same url`,
        });
      }

      // const data = {
      //   "body received from Vercel's middleware":
      //     '{"metadata":{"tags":[]},"sys":{"type":"Entry","id":"49ER2weHfGULg9ug9ilo7f","space":{"sys":{"type":"Link","linkType":"Space","id":"280j53ipcahw"}},"environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"blogPost"}},"createdBy":{"sys":{"type":"Link","linkType":"User","id":"3z6w32xJMPCq7um8fYndsQ"}},"updatedBy":{"sys":{"type":"Link","linkType":"User","id":"3z6w32xJMPCq7um8fYndsQ"}},"revision":4,"createdAt":"2023-05-16T09:57:09.931Z","updatedAt":"2023-05-16T10:29:02.366Z"},"fields":{"blogTitle":{"en-US":"Blog Post number 5, no less"},"slug":{"en-US":"blog-post-number-5-no-less"},"blogBody":{"en-US":{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"Hi! post number 5 ","nodeType":"text"}],"nodeType":"paragraph"},{"data":{},"content":[{"data":{},"marks":[],"value":"this edit was made to see the processed request body from Vercel\'s Next js","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"}}}}',
      // };

      // below is all good, client side
      // console.log('typeof req.body:', typeof req.body);
      // console.log('req.body:', req.body);
      // console.log('req.body.fields.slug["en-US"]:', req.body.fields.slug["en-US"]);

      const errorMessages = [];

      if (!req.body) {
        errorMessages.push(`req.body is not defined: ${req.body}`);
      }

      if (!req.body?.fields) {
        errorMessages.push(`req.body.fields is not defined: ${req.body.fields}`);
      }

      if (!req.body?.fields?.slug) {
        errorMessages.push(`req.body.fields.slug is not defined: ${req.body.fields.slug}`);
      }

      if (!req.body?.fields?.slug?.["en-US"]) {
        errorMessages.push(`req.body.fields.slug is not defined: ${req.body.fields.slug["en-US"]}`);
      }

      if (errorMessages.length > 0) {
        return res.status(401).json({
          errors: errorMessages,
          body: req.body
        });  
      }

      const page = `/${query.page}/${req.body.fields.slug["en-US"]}`;

      try {
        console.log(`Starting regeneration of page ${page}`);

        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        // await res.revalidate(`/${query.page}`);

        // delay of 10s gives "x-vercel-error": "FUNCTION_INVOCATION_TIMEOUT",
        // await setTimeout(500); // let Vercel breathe a bit
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
