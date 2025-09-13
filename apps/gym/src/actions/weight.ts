'use server'

import { IWeightEntry } from '@/types'
import axios from 'axios'
import { getSupabaseUserId } from '@/utils/supabase/utils'
import { convertDate } from '@/utils/utils'

const URL = process.env.URL + '/' + process.env.API_VERSION + '/weights'

export const getWeight = async () => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.get(URL, {
    params: {
      userId: userId,
    },
  })
  data.data = convertDate(data.data)
  return data
}

export const getCurrentWeight = async () => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.get(`${URL}/current`, {
    params: {
      userId: userId,
    },
  })
  return data
}

export const addWeight = async (entry: IWeightEntry) => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.post(URL, entry, {
    params: {
      userId: userId,
    },
  })
  return data
}

export const deleteWeight = async (id: number) => {
  const userId = await getSupabaseUserId()
  const { data } = await axios.delete(`${URL}/${id}`, {
    params: {
      userId: userId,
    },
  })
  return data
}

