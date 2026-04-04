import dotenv from 'dotenv'
import { IWeightImportData } from '../../globals'
dotenv.config()

export function createWeightEntries(userId: string, data: IWeightImportData[]) {
  return data.map((obj) => ({ ...obj, user_id: userId }))
}
