import { z } from '@hono/zod-openapi';

const badRequestResponse = ({
  message,
  path,
  reason,
}: {
  message: string;
  path: string[];
  reason: string;
}) => ({
  success: z.literal(false).value,
  error: {
    reason,
    issues: [
      {
        message,
        path,
      },
    ],
  },
});

export default badRequestResponse;
