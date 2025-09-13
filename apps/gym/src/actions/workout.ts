'use server'

import { IWorkout } from '@/types'
import { getSupabaseUserId } from '@/utils/supabase/utils'
import axios from 'axios'

// const URL = process.env.URL + '/' + process.env.API_VERSION + '/workouts'
const URL = process.env.URL + '/v3/workouts'

export const getWorkoutNumber = async () => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.get(`${URL}/count`, {
    params: {
      userId: userId,
    },
  })
  return data
}

export const createWorkout = async (workout: IWorkout[]) => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.post(
    URL,
    { workout },
    {
      params: {
        userId: userId,
      },
    }
  )
  return data
}
