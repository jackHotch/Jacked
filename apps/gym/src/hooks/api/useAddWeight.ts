import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addWeight } from '@/actions/weight'
import { IWeightEntry } from '@/types'

export const useAddWeight = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (entry: IWeightEntry) => {
      return addWeight(entry)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weight'] })
    },
  })
}
