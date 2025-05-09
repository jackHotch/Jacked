import { useQuery } from '@tanstack/react-query'
import { getExercises } from '@/actions/exercise'

export const useExercises = () => {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: () => getExercises(),
  })
}
