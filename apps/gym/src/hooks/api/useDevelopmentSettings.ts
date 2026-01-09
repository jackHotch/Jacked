import { getDevelopmentSettings } from '@/actions/development'
import { useQuery } from '@tanstack/react-query'

export const useDevelopmentSettings = () => {
  return useQuery({
    queryKey: ['dev_settings'],
    queryFn: () => getDevelopmentSettings(),
  })
}