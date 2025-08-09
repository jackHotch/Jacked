'use server'

import axios from 'axios'
import { IExercises } from '@/types'
import { getSupabaseUserId } from '@/utils/supabase/utils'

const URL = process.env.URL + '/' + process.env.API_VERSION + '/exercises'

export const getExercises = async () => {
  const userId = await getSupabaseUserId()

  try {
    const { data } = await axios.get(URL, {
      params: { userId },
    })

    if (data?.error) {
      console.error('API error:', data.error)
      return []
    }
    return data.exercises ?? []
  } catch (err) {
    console.error('Network or server error in getExercises:', err)
    return []
  }
}

export const createExercise = async (name: string) => {
  const userId = await getSupabaseUserId()
  try {
    const { data, status } = await axios.post(URL, { name }, { params: { userId } })

    if (status !== 201) {
      console.error('Unexpected status creating exercise:', status, data)
      return false
    }

    return true
  } catch (err) {
    console.error('Network or server error in createExercise:', err)
    return false
  }
}
