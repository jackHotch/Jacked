import { HTTPError } from './Error'

export const formatResponse = (statusCode: number, data?: any) => {
  if (statusCode < 300) {
    const status = 'success'
    return { status, statusCode, ...data }
  } else {
    const status = 'error'
    return { status, statusCode, ...data, ...HTTPError[statusCode] }
  }
}
