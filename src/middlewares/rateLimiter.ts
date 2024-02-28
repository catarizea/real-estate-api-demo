import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { MiddlewareHandler } from 'hono';

import { badRequestResponse } from '@/utils';

const rateLimiter: MiddlewareHandler = async (c, next) => {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    await next();
    return;
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
  });

  const identifier = c.req.header('Fly-Client-IP') || 'anonymous';

  const { success } = await rateLimit.limit(identifier);

  if (!success) {
    return c.json(
      badRequestResponse({
        reason: 'too many requests',
        message: `you have exceeded the rate limit`,
        path: ['request'],
      }),
      429,
    );
  }

  await next();
};

export default rateLimiter;
