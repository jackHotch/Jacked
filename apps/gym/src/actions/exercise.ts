'use server'

import axios from 'axios'
import { getSupabaseUserId } from '@/utils/supabase/utils'

// const URL = process.env.URL + '/' + process.env.API_VERSION + '/exercises'
const URL = process.env.URL + '/v3/exercises'

export const getExercises = async () => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.get(URL, {
    params: {
      userId: userId,
    },
  })
  return data
}

export const createExercise = async (name: string) => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.post(
    URL,
    { name },
    {
      params: {
        userId: userId,
      },
    }
  )
  return data
}
