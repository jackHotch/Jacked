'use server'

import axios from 'axios'
import { getSupabaseUserId } from '@/utils/supabase/utils'
import { IDevSettings, IWeightImportdata } from '@/types'

const URL = process.env.URL + '/' + process.env.API_VERSION + '/development'

export const getDevelopmentSettings = async () => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.get(`${URL}/settings`, {
    params: {
      userId: userId,
    },
  })
  return data
}

export const setDevelopmentSettings = async (settings: IDevSettings) => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.post(
    `${URL}/settings`,
    { settings },
    {
      params: {
        userId: userId,
      },
    },
  )
  return data
}

export const resetWeights = async (weightData: IWeightImportdata) => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.post(`${URL}/weights/reset`, weightData, {
    params: {
      userId: userId,
    },
  })
  return data
}
