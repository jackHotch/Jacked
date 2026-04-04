import { resetWeights } from '@/actions/development'
import { IWeightImportdata } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDevUpdateWeights = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (weights: IWeightImportdata) => {
      return resetWeights(weights)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weight'] })
    },
  })
}
