import { pool } from '../../db'
import dotenv from 'dotenv'
import { formatResponse } from '../../utils/utils'
dotenv.config()

export async function cronjob() {
  const client = await pool.connect()
  const { rows } = await client.query(`SELECT * FROM splits`)
  client.release()
  return rows
}

export async function getAllSplits(userId: string) {
  const client = await pool.connect()

  try {
    const splits = await client.query(
      `
      SELECT split_id, user_id, name, is_active, description, last_used_at FROM splits WHERE user_id = $1`,
      [userId]
    )

    if (splits.rowCount === 0) {
      return formatResponse(404, { message: 'No splits found' })
    }

    return formatResponse(200, { data: splits.rows })
  } catch (err) {
    console.error('Error in GET /splits:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}

export async function getCurrentSplitName(userId: string) {
  const client = await pool.connect()

  try {
    const currentSplit = await client.query(
      `SELECT name FROM splits WHERE is_active = 1 AND user_id = $1`,
      [userId]
    )

    if (currentSplit.rowCount === 0) {
      return formatResponse(404, { message: 'No active split found' })
    }

    return formatResponse(200, { data: currentSplit.rows[0] })
  } catch (err) {
    console.error('Error in GET /splits/current/name:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}

export async function getCurrentSplitId(userId: string) {
  const client = await pool.connect()

  try {
    const currentSplitId = await client.query(
      `SELECT split_id FROM splits WHERE is_active = 1 AND user_id = $1`,
      [userId]
    )

    if (currentSplitId.rowCount === 0) {
      return formatResponse(404, { message: 'No active split found'})
    }

    return formatResponse(200, { data: currentSplitId.rows[0]})
  } catch (err) {
    console.error('Error in GET /splits/current/id')
  }
}
