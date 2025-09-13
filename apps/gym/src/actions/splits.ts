'use server'

import { getSupabaseUserId } from '@/utils/supabase/utils'
import axios from 'axios'

const URL = process.env.URL + '/' + process.env.API_VERSION + '/splits'

export const getCurrentSplit = async () => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.get(`${URL}/current`, {
    params: {
      userId: userId,
    },
  })
  return data
}
