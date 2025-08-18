import styles from './WeightChart.module.css'
import { useWeight } from '@/hooks/api/useWeight'
import { getChartData } from '@/utils/utils'
import dayjs, { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'
import { WeightChartDesktop } from './WeightChartDesktop/WeightChartDesktop'
import { WeightChartMobile } from './WeightChartMobile/WeightChartMobile'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export const WeightChart = () => {
  const { data, isLoading } = useWeight()
  const [labels, setLabels] = useState([])
  const [weightData, setWeightData] = useState([])

  useEffect(() => {
    const [l, d] = getChartData(data?.data)
    setLabels(l)
    setWeightData(d)
  }, [data])

  const filterByRange = (startDate?: Dayjs, endDate?: Dayjs) => {
    startDate = startDate ? startDate : dayjs(data[0].date)
    endDate = endDate ? endDate : dayjs(data[data.length - 1].date)
    const filteredData = data?.filter((value) => {
      return dayjs(value.date).isBetween(startDate, endDate, 'day', '[]')
    })
    const [l, d] = getChartData(filteredData)
    setLabels(l)
    setWeightData(d)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <WeightChartDesktop
        filter={filterByRange}
        weightData={weightData}
        labels={labels}
        isLoading={isLoading}
        data={data}
      />
      <WeightChartMobile
        filter={filterByRange}
        weightData={weightData}
        labels={labels}
        isLoading={isLoading}
        data={data}
      />
    </LocalizationProvider>
  )
}
