import { pool } from '../db'
import dotenv from 'dotenv'
import { formatResponse } from '../utils/utils'
dotenv.config()

export async function getAllWeight(userId: string) {
  const client = await pool.connect()

  try {
    const weights = await client.query(
      `SELECT weight_id, weight, date FROM weights WHERE user_id = $1 ORDER BY date`,
      [userId]
    )

    if (weights.rowCount === 0) {
      return formatResponse(404, { message: 'No weights found' })
    }

    return formatResponse(200, { data: weights.rows })
  } catch (err) {
    console.error('Error in GET /weights:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}

export async function getWeight(userId: string, id: string) {
  if (!id) {
    return formatResponse(400, { message: 'Weight ID is required' })
  }

  const client = await pool.connect()
  try {
    const weight = await client.query(
      `SELECT weight, date FROM weights WHERE user_id = $1 AND weight_id = $2`,
      [userId, id]
    )

    if (weight.rowCount !== 1) {
      return formatResponse(404, { message: 'Weight not found' })
    }

    return formatResponse(200, { data: weight.rows[0] })
  } catch (err) {
    console.error('Error in GET /weights/:id')
    return formatResponse(500)
  } finally {
    client.release()
  }
}

export async function createEntry(userId: string, weight: number, date: string) {
  if (!weight) {
    return formatResponse(400, { message: 'Weight is required' })
  }

  if (!date) {
    return formatResponse(400, { message: 'Date is required' })
  }

  const client = await pool.connect()
  try {
    const result = await client.query(
      `
      INSERT INTO weights (user_id, weight, date) 
      VALUES ($1, $2, $3)`,
      [userId, weight, date]
    )

    if (result.rowCount !== 1) {
      return formatResponse(400, { message: 'Failed to insert weight' })
    }

    return formatResponse(201, { message: 'Weight entry created' })
  } catch (err) {
    console.error('Error in POST /weights:', err)
  } finally {
    client.release()
  }
}

export async function deleteEntry(userId: string, id: string) {
  if (!id) {
    return formatResponse(400, { message: 'ID is required' })
  }

  const client = await pool.connect()
  try {
    await client.query(`BEGIN`)
    const result = await client.query(
      `DELETE FROM weights WHERE user_id = $1 AND weight_id = $2`,
      [userId, id]
    )

    if (result.rowCount < 1) {
      await client.query(`ROLLBACK`)
      return formatResponse(404, { message: 'Failed to delete entry' })
    }

    if (result.rowCount > 1) {
      await client.query(`ROLLBACK`)
      return formatResponse(404, { message: 'Multiple records founds' })
    }

    await client.query(`COMMIT`)
    return formatResponse(200, { message: 'Entry deleted' })
  } catch (err) {
    console.error('Error in DELETE /weights/:id', err)
    await client.query(`ROLLBACK`)
    return formatResponse(500)
  } finally {
    client.release()
  }
}

export async function getCurrentWeight(userId: string) {
  const client = await pool.connect()
  try {
    const weight = await client.query(
      `SELECT weight, date FROM weights WHERE user_id = $1 ORDER BY date DESC LIMIT 1`,
      [userId]
    )

    if (weight.rowCount !== 1) {
      return formatResponse(404, { message: 'Failed to find current weight' })
    }

    return formatResponse(200, { data: weight.rows[0] })
  } catch (err) {
    console.error('Error in GET /weights/current')
    return formatResponse(500)
  } finally {
    client.release()
  }
}
