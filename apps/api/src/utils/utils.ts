import { HTTPError } from './error'

interface data {
  data?: any
  message?: string
}

export const formatResponse = (statusCode: number, data?: data) => {
  if (statusCode < 300) {
    const status = 'success'
    return { status, statusCode, ...data }
  } else {
    const status = 'error'
    return { status, statusCode, ...data, ...HTTPError[statusCode] }
  }
}
