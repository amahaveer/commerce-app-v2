import { getTemplate } from '../../src/services/template';
import { getTemplateByCId } from '../../src/services/contentfulClient';
import 'jest';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';

const getMockGetTemplate = () => {
  return {
    sys: {
      type: 'Array',
    },
    total: 1,
    skip: 0,
    limit: 100,
    items: [
      {
        metadata: {
          tags: [],
          concepts: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ek6bj6qy61f0',
            },
          },
          id: '53rilnyFHwqOSsdZkwWIFG',
          type: 'Entry',
          createdAt: '2024-09-24T07:06:56.963Z',
          updatedAt: '2024-09-24T07:06:56.963Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 9,
          revision: 1,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'homeNavigation',
            },
          },
          locale: 'en-US',
        },
        fields: {
          title: 'Electronics',
          image: {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'ek6bj6qy61f0',
                },
              },
              id: '29GFO012wx9vNBAehTZ31x',
              type: 'Asset',
              createdAt: '2024-09-24T06:55:45.914Z',
              updatedAt: '2024-09-24T11:30:59.858Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              publishedVersion: 6,
              revision: 2,
              locale: 'en-US',
            },
            fields: {
              title: 'electronics',
              description: 'Electronics',
              file: {
                url: '//images.ctfassets.net/ek6bj6qy61f0/29GFO012wx9vNBAehTZ31x/e7b6d9f991b6fc77fbf90afa0c4fe2e3/menu-home-1.webp',
                details: {
                  size: 21514,
                  image: {
                    width: 630,
                    height: 570,
                  },
                },
                fileName: 'menu-home-1.webp',
                contentType: 'image/webp',
              },
            },
          },
          title1: 'Fashion',
          image1: {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'ek6bj6qy61f0',
                },
              },
              id: '2O0TlJM35R1Jjk2WKw4a1g',
              type: 'Asset',
              createdAt: '2024-09-24T07:03:53.998Z',
              updatedAt: '2024-09-24T11:30:42.699Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              publishedVersion: 8,
              revision: 2,
              locale: 'en-US',
            },
            fields: {
              title: '/',
              description: 'Fashion',
              file: {
                url: '//images.ctfassets.net/ek6bj6qy61f0/2O0TlJM35R1Jjk2WKw4a1g/de7868abfc53da8fe4d95d321785ed7b/Fashion.webp',
                details: {
                  size: 20146,
                  image: {
                    width: 630,
                    height: 570,
                  },
                },
                fileName: 'Fashion.webp',
                contentType: 'image/webp',
              },
            },
          },
          title2: 'Beauty',
          image2: {
            metadata: {
              tags: [],
              concepts: [],
            },
            sys: {
              space: {
                sys: {
                  type: 'Link',
                  linkType: 'Space',
                  id: 'ek6bj6qy61f0',
                },
              },
              id: '6fbc5gL8ml9ZK7g5ABFcAn',
              type: 'Asset',
              createdAt: '2024-09-24T07:05:50.835Z',
              updatedAt: '2024-09-24T11:30:12.955Z',
              environment: {
                sys: {
                  id: 'master',
                  type: 'Link',
                  linkType: 'Environment',
                },
              },
              publishedVersion: 5,
              revision: 2,
              locale: 'en-US',
            },
            fields: {
              title: 'beauty',
              description: 'Beauty',
              file: {
                url: '//images.ctfassets.net/ek6bj6qy61f0/6fbc5gL8ml9ZK7g5ABFcAn/b35038dc22d4d7200b7e91f8a1a024bf/beauty.webp',
                details: {
                  size: 23698,
                  image: {
                    width: 630,
                    height: 570,
                  },
                },
                fileName: 'beauty.webp',
                contentType: 'image/webp',
              },
            },
          },
          title3: 'Jewlery',
          image3: {
            metadata: {
              tags: [],
              concepts: [],
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
              publishedVersion: 12,
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
          },
        },
      },
    ],
    includes: {
      Asset: [
        {
          metadata: {
            tags: [],
            concepts: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'ek6bj6qy61f0',
              },
            },
            id: '29GFO012wx9vNBAehTZ31x',
            type: 'Asset',
            createdAt: '2024-09-24T06:55:45.914Z',
            updatedAt: '2024-09-24T11:30:59.858Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            publishedVersion: 6,
            revision: 2,
            locale: 'en-US',
          },
          fields: {
            title: 'electronics',
            description: 'Electronics',
            file: {
              url: '//images.ctfassets.net/ek6bj6qy61f0/29GFO012wx9vNBAehTZ31x/e7b6d9f991b6fc77fbf90afa0c4fe2e3/menu-home-1.webp',
              details: {
                size: 21514,
                image: {
                  width: 630,
                  height: 570,
                },
              },
              fileName: 'menu-home-1.webp',
              contentType: 'image/webp',
            },
          },
        },
        {
          metadata: {
            tags: [],
            concepts: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'ek6bj6qy61f0',
              },
            },
            id: '2O0TlJM35R1Jjk2WKw4a1g',
            type: 'Asset',
            createdAt: '2024-09-24T07:03:53.998Z',
            updatedAt: '2024-09-24T11:30:42.699Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            publishedVersion: 8,
            revision: 2,
            locale: 'en-US',
          },
          fields: {
            title: '/',
            description: 'Fashion',
            file: {
              url: '//images.ctfassets.net/ek6bj6qy61f0/2O0TlJM35R1Jjk2WKw4a1g/de7868abfc53da8fe4d95d321785ed7b/Fashion.webp',
              details: {
                size: 20146,
                image: {
                  width: 630,
                  height: 570,
                },
              },
              fileName: 'Fashion.webp',
              contentType: 'image/webp',
            },
          },
        },
        {
          metadata: {
            tags: [],
            concepts: [],
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
            publishedVersion: 12,
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
        },
        {
          metadata: {
            tags: [],
            concepts: [],
          },
          sys: {
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'ek6bj6qy61f0',
              },
            },
            id: '6fbc5gL8ml9ZK7g5ABFcAn',
            type: 'Asset',
            createdAt: '2024-09-24T07:05:50.835Z',
            updatedAt: '2024-09-24T11:30:12.955Z',
            environment: {
              sys: {
                id: 'master',
                type: 'Link',
                linkType: 'Environment',
              },
            },
            publishedVersion: 5,
            revision: 2,
            locale: 'en-US',
          },
          fields: {
            title: 'beauty',
            description: 'Beauty',
            file: {
              url: '//images.ctfassets.net/ek6bj6qy61f0/6fbc5gL8ml9ZK7g5ABFcAn/b35038dc22d4d7200b7e91f8a1a024bf/beauty.webp',
              details: {
                size: 23698,
                image: {
                  width: 630,
                  height: 570,
                },
              },
              fileName: 'beauty.webp',
              contentType: 'image/webp',
            },
          },
        },
      ],
    },
  };
};

jest.mock('../../src/services/contentfulClient', () => ({
  getTemplateByCId: jest.fn(),
}));

describe('getTemplateService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully get the template', async () => {
    const mockRequest = {
      id: 'homeNavigation',
    };
    const mockTemplate = getMockGetTemplate();

    (getTemplateByCId as jest.Mock).mockReturnValue(mockTemplate);

    const result = await getTemplate(mockRequest?.id);
    expect(result).toEqual(mockTemplate);
    expect(getTemplateByCId).toHaveBeenCalledWith(mockRequest?.id);
  });
});
