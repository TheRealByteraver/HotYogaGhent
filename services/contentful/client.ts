import { createClient } from "contentful";

const getContentfulClient = () => {
  // console.log('process.env.CONTENTFUL_SPACE_ID', process.env.CONTENTFUL_SPACE_ID);
  // console.log('process.env.CONTENTFUL_ACCESS_KEY', process.env.CONTENTFUL_ACCESS_KEY);
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
  });
}

const getContentfulEntry =  async (query: string) => {
  const client = getContentfulClient();
  return await client.getEntry(query);
}

const getContentfulEntries =  async (query: object) => {
  const client = getContentfulClient();
  return await client.getEntries(query);
}

export { getContentfulEntry, getContentfulEntries };