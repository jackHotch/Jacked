import { pool } from '../db'
import dotenv from 'dotenv'
dotenv.config()

export async function cronjob() {
  const client = await pool.connect()
  const { rows } = await client.query(`SELECT * FROM splits`)
  client.release()
  return rows
}

export async function getAllSplits(userId: string) {
  const client = await pool.connect()
  const { rows } = await client.query(`SELECT * FROM splits WHERE user_id = $1`, [userId])
  client.release()
  return rows
}

export async function getCurrentSplit(userId: string) {
  const client = await pool.connect()
  const { rows } = await client.query(
    `SELECT name FROM splits WHERE active = 1 AND user_id = $1`,
    [userId]
  )
  client.release()
  return rows
}
