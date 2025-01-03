import { getContent } from '../../src/services/content';
import { getContentById } from '../../src/services/contentfulClient';
import 'jest';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';

const getMockGetContent = () => {
  return {
    metadata: {
      tags: [],
    },
    sys: {
      space: {
        sys: {
          type: 'Link',
          linkType: 'Space',
          id: 'ek6bj6qy61f0',
        },
      },
      id: '5xzs5639SMcUGseWvJKr5r',
      type: 'Asset',
      createdAt: '2024-09-24T07:06:25.058Z',
      updatedAt: '2024-09-24T11:34:10.054Z',
      environment: {
        sys: {
          id: 'master',
          type: 'Link',
          linkType: 'Environment',
        },
      },
      revision: 3,
      locale: 'en-US',
    },
    fields: {
      title: 'jewellery',
      description: 'Jewellery',
      file: {
        url: '//images.ctfassets.net/ek6bj6qy61f0/5xzs5639SMcUGseWvJKr5r/0e0eba0422dbd0da3ae736817cfa8a61/jewlery.webp',
        details: {
          size: 16674,
          image: {
            width: 630,
            height: 570,
          },
        },
        fileName: 'jewlery.webp',
        contentType: 'image/webp',
      },
    },
  };
};

jest.mock('../../src/services/contentfulClient', () => ({
  getContentById: jest.fn(),
}));

describe('getContentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully get the content', async () => {
    const mockRequest = {
      id: '5xzs5639SMcUGseWvJKr5r',
    };
    const mockContent = getMockGetContent();

    (getContentById as jest.Mock).mockReturnValue(mockContent);

    const result = await getContent(mockRequest?.id);
    expect(result).toEqual(mockContent);
    expect(getContentById).toHaveBeenCalledWith(mockRequest?.id);
  });
});
