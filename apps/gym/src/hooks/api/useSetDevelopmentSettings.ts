import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IDevSettings } from '@/types'
import { setDevelopmentSettings } from '@/actions/development'

export const useSetDevelopmentSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (settings: IDevSettings) => {
      return setDevelopmentSettings(settings)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dev_settings'] })
    },
  })
}
