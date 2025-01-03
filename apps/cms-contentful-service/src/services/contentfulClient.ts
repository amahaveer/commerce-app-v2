import { createClient, ContentfulClientApi } from 'contentful';
import 'dotenv/config';

export default class ContentApi {
  private client;
  constructor() {
    this.client = createClient({
      accessToken: process.env.ACCESS_TOKEN as string,
      space: process.env.SPACE_ID as string,
    });
  }

  async getContentById(id: string) {
    return this.client.getAsset(id);
  }

  async getContentTypes() {
    return this.client.getContentTypes();
  }

  async getTemplateByCId(id: string) {
    return this.client.getEntries({
      content_type: id,
    });
  }
}
