// file pages/api/revalidate:

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
    // res.status(200).json({ feedback: "GET request successfull" });
    // break;

    case "POST":
      // Check for secret to confirm this is a valid request
      if (query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({
          message: `Invalid token '${query.secret}', you are not allowed to revalidate page ${query.page}.`,
        });
      }

      if (
        (query.page === undefined) ||
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
      ) {
        return res.status(401).json({ message: `The page '${query.page}' does not exist` });
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

    default:
      // we received a different type of request, explain that only GET and POST
      // are allowed and give feedback to the client
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
