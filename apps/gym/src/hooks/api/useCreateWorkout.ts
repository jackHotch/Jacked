import { useMutation } from '@tanstack/react-query'
import { createWorkout } from '@/actions/workout'
import { IWorkout } from '@/types'

export const useCreateWorkout = () => {
  return useMutation({
    mutationFn: (workout: IWorkout[]) => createWorkout(workout),
  })
}
