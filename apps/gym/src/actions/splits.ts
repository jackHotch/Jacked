'use server'

import { getSupabaseUserId } from '@/utils/supabase/utils'
import axios from 'axios'

const URL = process.env.URL + '/' + process.env.API_VERSION + '/splits'

export const getCurrentSplitName = async () => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.get(`${URL}/current/name`, {
    params: {
      userId: userId,
    },
  })
  return data
}

export const getAllSplitsSummary = async () => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.get(`${URL}/summary`, {
    params: {
      userId: userId,
    },
  })
  return data
}
