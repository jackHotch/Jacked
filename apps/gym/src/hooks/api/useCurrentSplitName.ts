import { getCurrentSplitName } from '@/actions/splits'
import { useQuery } from '@tanstack/react-query'

export const useCurrentSplitName = () => {
  const response = useQuery({
    queryKey: ['currentSplit'],
    queryFn: () => getCurrentSplitName(),
  })
  const isEmpty = !response.isLoading && !response.data
  return { ...response, isEmpty }
}
