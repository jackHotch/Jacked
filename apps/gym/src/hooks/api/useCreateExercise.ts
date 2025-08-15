import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createExercise } from '@/actions/exercise'

export const useCreateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (name: string) => {
      return createExercise(name)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
    },
  })
}
