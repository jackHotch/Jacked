import { pool } from '../../db'
import dotenv from 'dotenv'
import { formatResponse } from '../../utils/utils'
dotenv.config()

export async function getDevSettings(userId: string) {
  const client = await pool.connect()

  try {
    const settings = await client.query(`SELECT * FROM dev_settings WHERE user_id = $1;`, [userId])

    if (settings.rowCount === 0) {
      return formatResponse(404, { message: 'No settings found' })
    }

    return formatResponse(200, { data: settings.rows[0] })
  } catch (err) {
    console.error('Error in GET /development/settings:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}
