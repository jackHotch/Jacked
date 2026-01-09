'use server'

import axios from 'axios'
import { getSupabaseUserId } from '@/utils/supabase/utils'

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