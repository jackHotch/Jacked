import { pool } from '../db'
import dotenv from 'dotenv'
dotenv.config()

export async function getHeaderData(userId: string) {
  if (userId) {
    const client = await pool.connect()

    const { rows } = await pool.query(
      `SELECT w.weight, s.name FROM weights w
       INNER JOIN splits s ON s.active = 1
       WHERE w.user_id = '$1'
       ORDER BY w.date DESC
       LIMIT 1`,
      [userId]
    )

    client.release()
    return rows
  } else {
  }
}
