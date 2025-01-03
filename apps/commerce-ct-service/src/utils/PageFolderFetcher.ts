import { Request } from '@royalcyber/global-types';
import axios from 'axios';
import { getLocale, getPath } from './Request';

/**
 * PageFolderFetcher can be used on multi-store projects to fetch
 * Page Folder Configuration when not available on the context.
 */
export class PageFolderFetcher {
  /**
   * If passed, the path should start with '/'.
   */
  static fetchPageFolderConfiguration = async (
    request: Request,
    path?: string,
  ): Promise<any> => {
    // TODO: get default locale if empty locale from request
    const locale = getLocale(request) ?? 'de_CH';

    // If path is empty, try to get the first position of the request path.
    const matchedPath = getPath(request)?.match(/[^\/]+/);
    path = path ?? (matchedPath ? '/' + matchedPath[0] : undefined);

    if (path === undefined) {
      return undefined;
    }

    // TODO: get host where Page Folder Fetcher can be fetched
    const url = `https://${request.hostname}/page?path=${path}&locale=${locale}`;

    return await axios
      .get(url)
      .then((response) => {
        return response.data?.pageFolder?.configuration;
      })
      .catch((reason) => {
        console.error(reason);
        return reason;
      });
  };
}
