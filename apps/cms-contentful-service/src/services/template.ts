import ContentApi from './contentfulClient';

export async function getTemplate(id: string): Promise<any> {
  try {
    const contentApi = new ContentApi();
    const templateData = await contentApi.getTemplateByCId(id);
    return templateData;
  } catch (error: any) {
    throw error;
  }
}