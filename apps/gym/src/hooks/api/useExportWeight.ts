import { useMutation } from '@tanstack/react-query'
import { exportWeight } from '@/actions/weight'
import { getFormattedDate } from '@/utils/utils'

export const useExportWeight = () => {
  return useMutation({
    mutationFn: exportWeight,
    onSuccess: (data) => {
      const date = getFormattedDate(new Date())
      const blob = new Blob([data.data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${date} weight-data.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    },
  })
}
