import { createClient } from "contentful";

const getContentfulClient = () => {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
  });
}

const getContentfulEntry = async <T>(query: string) => {
  const client = getContentfulClient();
  return await client.getEntry<T>(query);
}

const getContentfulEntries =  async <T>(query: object) => {
  const client = getContentfulClient();
  return await client.getEntries<T>(query);
}


export { getContentfulEntry, getContentfulEntries };