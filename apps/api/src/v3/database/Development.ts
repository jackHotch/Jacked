import { pool } from '../../db'
import dotenv from 'dotenv'
import { formatResponse } from '../../utils/utils'
import { IDevSettings } from '../../globals'
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

export async function setDevSettings(updatedSettings: IDevSettings, userId: string) {
  const client = await pool.connect()

  try {
    const settings = await client.query(`
      UPDATE dev_settings 
      SET is_caching_enabled = $2 
      WHERE user_id = $1;`, 
      [userId, updatedSettings.is_caching_enabled]
    )
    console.log(settings)

    if (settings.rowCount === 0) {
      return formatResponse(400, { message: 'Unable to update settings' })
    }

    return formatResponse(200, { message: 'Settings updated successfully' })
  } catch (err) {
    console.error('Error in POST /development/settings:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}
