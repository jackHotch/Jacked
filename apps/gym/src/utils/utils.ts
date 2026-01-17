import { IWeightData } from '@/types'
import dayjs from 'dayjs'

export const convertDate = (data: IWeightData[] = []) => {
  return data.map((entry) => ({
    ...entry,
    date: dayjs(entry.date).format('MM/DD/YYYY'),
  }))
}

export const getChartData = (list: IWeightData[]) => {
  let l = []
  let d = []
  const data = convertDate(list)
  data?.map((value) => {
    l.push(value.date.substring(0, 5))
    d.push(value.weight)
  })
  return [l, d]
}

export const cssvar = (name: string) => {
  return window.getComputedStyle(document.documentElement).getPropertyValue(name)
}

export function getFormattedDate(date: Date) {
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
  let day = date.getDate().toString().padStart(2, '0');
  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
