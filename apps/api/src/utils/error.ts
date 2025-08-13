export const HTTPError = {
  400: {
    code: 'BAD_REQUEST',
    error: 'Bad request',
  },
  401: {
    code: 'UNAUTHORIZED',
    error: 'Unauthorized',
    statusCode: 401,
  },
  403: {
    code: 'FORBIDDEN',
    error: 'Forbidden',
    statusCode: 403,
  },
  404: {
    code: 'RESOURCE_NOT_FOUND',
    error: 'Resource not found',
    statusCode: 404,
  },
  422: {
    code: 'UNPROCESSABLE_CONTENT',
    error: 'Server was unable to process the contained instructions',
    statusCode: 422,
  },
  500: {
    code: 'INTERNAL_SERVER_ERROR',
    error: 'Something went wrong, Please try again later.',
    statusCode: 500,
  },
  502: {
    code: 'BAD_GATEWAY',
    error: 'Bad gateway',
    statusCode: 502,
  },
  503: {
    code: 'SERVICE_UNAVAILABLE',
    error: 'Service unavailable',
    statusCode: 503,
  },
  504: {
    code: 'GATEWAY_TIMEOUT',
    error: 'Gateway timeout',
    statusCode: 504,
  },
}
