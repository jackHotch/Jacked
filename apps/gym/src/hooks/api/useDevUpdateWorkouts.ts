import { getWeight } from '@/actions/weight'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDevUpdateWorkouts = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (workouts) => {
      return getWeight()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
    },
  })
}
