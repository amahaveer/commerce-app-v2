import { client } from "@/lib/contentful/client";

export const fetchContentfulEntry = async (entryId: string):Promise<unknown> => {
  try {
    const data = await client.getEntry(entryId);
    return data.fields;
  } catch (error) {
    console.error('Error fetching Contentful entry:', error);
    return null;
  }
};
