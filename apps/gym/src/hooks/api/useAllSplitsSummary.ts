import { useQuery } from '@tanstack/react-query'
import { getAllSplitsSummary } from '@/actions/splits'

export const useAllSplitsSummary = () => {
  return useQuery({
    queryKey: ['splits', 'summary'],
    queryFn: () => getAllSplitsSummary(),
  })
}
