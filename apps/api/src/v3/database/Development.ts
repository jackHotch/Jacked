import { pool } from '../../db'
import dotenv from 'dotenv'
import { formatResponse } from '../../utils/utils'
import { IDevSettings, IWeightImportData } from '../../globals'
import { createWeightEntries } from './DatabaseScripts'
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
    const settings = await client.query(
      `
      UPDATE dev_settings 
      SET is_caching_enabled = $2 
      WHERE user_id = $1;`,
      [userId, updatedSettings.is_caching_enabled],
    )

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

export async function resetWeights(userId: string, data: IWeightImportData[]) {
  const client = await pool.connect()

  const formattedWeights = createWeightEntries(userId, data)

  try {
    await client.query(`BEGIN`)

    const deleted = await client.query(
      `DELETE FROM weights
      WHERE user_id = $1
      RETURNING *;
      `,
      [userId],
    )
    console.log(deleted.rowCount)

    let values = []
    const placeholders = formattedWeights.map((row, i) => {
      const offset = i * 3
      values.push(row.weight, row.date, row.user_id)
      return `($${offset + 1}, $${offset + 2}, $${offset + 3})`
    })

    const weights = await client.query(
      `INSERT INTO weights (weight, date, user_id)
      VALUES ${placeholders.join(', ')}
      RETURNING *;
      `,
      values,
    )

    if (weights.rowCount === 0 || weights.rowCount != data.length) {
      return formatResponse(400, { message: 'Unable to update weights' })
    }

    await client.query('COMMIT')
    return formatResponse(200, { message: 'Weights updated successfully' })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Error in POST /development/weights/reset:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}
