import { pool } from '../db'
import dotenv from 'dotenv'
import { formatResponse } from '../utils/utils'
dotenv.config()

export async function getExercises(userId: string) {
  const client = await pool.connect()

  try {
    const exercises = await client.query(
      `SELECT exercise_id, user_id, name, is_default FROM exercises
       WHERE is_default = 1 OR user_id = $1`,
      [userId]
    )

    if (exercises.rowCount === 0) {
      return formatResponse(404, { message: 'No exercises found' })
    }

    return formatResponse(200, { data: exercises.rows })
  } catch (err) {
    console.error('Error in GET /exercises:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}

export async function insertExercise(userId: string, name: string) {
  if (!name) {
    return formatResponse(400, { message: 'Exercise name is required' })
  }

  const client = await pool.connect()

  try {
    const exerciseExists = await client.query(
      `SELECT 1 FROM exercises
       WHERE name = $1 
       AND user_id = $2
       OR is_default = 1`,
      [name, userId]
    )

    if (exerciseExists.rowCount === 1) {
      return formatResponse(400, { message: 'Exercise already exists' })
    }

    const result = await client.query(
      `INSERT INTO exercises (name, user_id) VALUES ($1, $2)`,
      [name, userId]
    )

    if (result.rowCount !== 1) {
      return formatResponse(400, { message: 'Failed to insert exercise' })
    }

    return formatResponse(201, { message: 'Exercise created' })
  } catch (err) {
    console.error('Error in POST /exercises:', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}
