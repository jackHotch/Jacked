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

export function getFormattedDate(date: Date) {
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
  let day = date.getDate().toString().padStart(2, '0');
  let year = date.getFullYear();

  return `${month}-${day}-${year}`;
}
