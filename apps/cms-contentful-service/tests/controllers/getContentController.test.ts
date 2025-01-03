import { Request, Response } from 'express';
import { getContentController } from '../../src/controllers/contentController';
import { getContent } from '../../src/services/content';
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

jest.mock('../../src/services/content', () => ({
  getContent: jest.fn(),
}));

describe('getContentController', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it('should return 200 and content that matches id successfully', async () => {
    const paramsDraft = { id: '5xzs5639SMcUGseWvJKr5r' };

    mockRequest.params = paramsDraft;

    const mockContent = getMockGetContent();

    (getContent as jest.Mock).mockReturnValue(mockContent);

    await getContentController(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(getContent).toHaveBeenCalledWith(paramsDraft.id);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Successful',
      data: {
        content: mockContent,
      },
    });
  });

  it('should return 500 when an internal error occurs', async () => {
    const paramsDraft = { id: '5xzs5639SMcUGseWvJKr5r' };

    mockRequest.params = paramsDraft;

    const error = new Error('Contentful error');
    (getContent as jest.Mock).mockImplementation(() => {
      throw error;
    });

    const consoleErrorSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    await getContentController(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(getContent).toHaveBeenCalledWith(paramsDraft.id);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'ERROR getContentController.ts/getContentController() :: ',
      error.message,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal server error',
    });

    consoleErrorSpy.mockRestore();
  });
});
