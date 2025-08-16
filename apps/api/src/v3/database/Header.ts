import { pool } from '../../db'
import dotenv from 'dotenv'
import { formatResponse } from '../../utils/utils'
dotenv.config()

export async function getHeaderData(userId: string) {
  const client = await pool.connect()

  try {
    const headerData = await pool.query(
      `SELECT w.weight, s.name FROM weights w
       INNER JOIN splits s ON s.active = 1
       WHERE w.user_id = $1
       ORDER BY w.date DESC
       LIMIT 1`,
      [userId]
    )

    if (headerData.rowCount !== 1) {
      return formatResponse(404, { message: 'Unable to get header data' })
    }

    return formatResponse(200, { data: headerData.rows })
  } catch (err) {
    console.error('Error in GET /header:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}
