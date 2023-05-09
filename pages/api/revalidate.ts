// file pages/api/revalidate:

// hooked as https://hot-yoga-ghent.vercel.app/api/revalidate

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
      console.log("revalidation triggered!");

      // Check for secret to confirm this is a valid request
      if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    
      try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate("/timetable");
        return res.json({ revalidated: true });
      } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send("Error revalidating");
      }
      break;

    default:
      // we received a different type of request, explain that only GET and POST
      // are allowed and give feedback to the client
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} is not allowed`);
  }
}
