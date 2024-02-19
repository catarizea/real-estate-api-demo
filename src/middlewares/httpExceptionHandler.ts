import { Context } from 'hono';

import {
  badRequestResponse,
  getCodeDescriptionPath,
  hasStatusNameBody,
} from '@/utils';

const httpExceptionHandler = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  c: Context,
) => {
  if (typeof err.getResponse !== 'undefined') {
    const response = err.getResponse();

    if (response instanceof Response) {
      const body = await response.text();

      if (body && body === 'Malformed JSON in request body') {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: 'malformed json in request body',
            path: ['body'],
          }),
          400,
        );
      }

      return response;
    }
  }

  if (
    hasStatusNameBody(err) &&
    err.status === 400 &&
    err.name === 'DatabaseError' &&
    err.body &&
    err.body.message
  ) {
    const result = getCodeDescriptionPath(err.body.message);

    if (result) {
      return c.json(
        badRequestResponse({
          reason: result.code,
          message: result.description,
          path: [result.path],
        }),
        400,
      );
    }
  }

  return c.json(
    badRequestResponse({
      reason: 'internal server error',
      message: err.message || `${err}`,
      path: ['unknown'],
    }),
    500,
  );
};

export default httpExceptionHandler;
