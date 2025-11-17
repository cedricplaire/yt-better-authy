import { describe, it, expect, vi, afterEach } from 'vitest';

// Mock prisma module before importing the module that initializes PrismaClient
vi.mock('../lib/prisma', () => {
  return {
    default: {
      post: {
        findMany: vi.fn(),
      },
    },
  };
});

import prisma from '../lib/prisma';
import { threeLatestPost } from '../data/posts-data';
import { PostCategory } from '../lib/generated/prisma/enums';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('threeLatestPost', () => {
  it('calls prisma.post.findMany with normalized category', async () => {
    const fakeResult = [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Test',
        subject: 'Sub',
        category: PostCategory.TECHNOLOGY,
        content: 'c',
        published: false,
        userId: 'u1',
        user: { name: 'Alice' },
      },
    ];

  // set the mocked implementation / resolved value
  (prisma.post.findMany as unknown as jest.Mock)?.mockResolvedValue?.(fakeResult);

  const res = await threeLatestPost('tech');

  expect(prisma.post.findMany).toHaveBeenCalled();
  const callArg = (prisma.post.findMany as any).mock.calls[0][0];
  expect(callArg.where.category).toBe(PostCategory.TECHNOLOGY);
  expect(res).toEqual(fakeResult);
  });
});
