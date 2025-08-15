'use server'

import axios from 'axios'
import { getSupabaseUserId } from '@/utils/supabase/utils'
import { IExercises } from '@/types'

const URL = process.env.URL + '/' + process.env.API_VERSION + '/exercises'

export const getExercises = async () => {
  const userId = await getSupabaseUserId()
  return (await axios.get(URL, {
    params: {
      userId: userId,
    },
  })) as IExercises[]
}

export const createExercise = async (name: string) => {
  const userId = await getSupabaseUserId()
  return await axios.post(
    URL,
    { name },
    {
      params: {
        userId: userId,
      },
    }
  )
}
