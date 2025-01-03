import ContentApi from './contentfulClient';

export async function getContent(id: string): Promise<any> {
  try {
    const contentApi = new ContentApi();
    const content = await contentApi.getContentById(id);
    return content;
  } catch (error: any) {
    throw error;
  }
}
