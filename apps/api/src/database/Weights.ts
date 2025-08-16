import { pool } from '../db'
import dotenv from 'dotenv'
dotenv.config()

export async function getAllWeight(userId: string) {
  const client = await pool.connect()
  const { rows } = await client.query(
    `SELECT weight_id, weight, date FROM weights WHERE user_id = $1 ORDER BY date`,
    [userId]
  )
  client.release()
  return rows
}

export async function getWeight(userId: string, id: string) {
  const client = await pool.connect()
  const { rows } = await client.query(
    `SELECT * FROM weights WHERE user_id = $1 AND weight_id = $2`,
    [userId, id]
  )
  client.release()
  return rows
}

export async function createEntry(userId: string, weight: number, date: string) {
  const client = await pool.connect()
  await client.query(`INSERT INTO weights (user_id, weight, date) VALUES ($1, $2, $3)`, [
    userId,
    weight,
    date,
  ])
  client.release()
}

export async function deleteEntry(userId: string, id: string) {
  const client = await pool.connect()
  await client.query(`DELETE FROM weights WHERE user_id = $1 AND weight_id = $2`, [
    userId,
    id,
  ])
  client.release()
}

export async function getCurrentWeight(userId: string) {
  const client = await pool.connect()
  const { rows } = await client.query(
    `SELECT weight, date FROM weights WHERE user_id = $1 ORDER BY date DESC LIMIT 1`,
    [userId]
  )
  client.release()
  return rows
}
