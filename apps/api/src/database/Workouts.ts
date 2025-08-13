import { pool } from '../db'
import dotenv from 'dotenv'
import { IExercises } from '../globals'
import { formatResponse } from '../utils/utils'

dotenv.config()

export async function getCurrentWorkoutCount(userId: string) {
  const client = await pool.connect()
  try {
    const workoutCount = await client.query(
      'SELECT COUNT(*)::int FROM workouts WHERE user_id = $1',
      [userId]
    )

    if (workoutCount.rowCount !== 1) {
      return formatResponse(404, { message: 'Failed to get workout count' })
    }

    return formatResponse(200, { data: workoutCount.rows[0] })
  } catch (err) {
    console.error('Error in GET /workouts/count')
    return formatResponse(500)
  } finally {
    client.release()
  }
}

export const getWorkout = async (userId: string, workoutId: string) => {
  if (!workoutId) {
    return formatResponse(400, { message: 'Workout ID is required' })
  }
  const client = await pool.connect()
  try {
    const workout = await client.query(
      `SELECT w.date, e.name, ws.set_order, ws.weight, ws.reps, ws.rpe, ws.notes
       FROM workouts w
       INNER JOIN workout_sets ws ON w.workout_id = ws.workout_id
       INNER JOIN exercises e ON ws.exercise_id = e.exercise_id
       WHERE w.user_id = $1 AND w.workout_id = $2;`,
      [userId, workoutId]
    )

    if (workout.rowCount === 0) {
      return formatResponse(404, { message: 'Failed to get workout' })
    }

    return formatResponse(200, { data: workout.rows })
  } catch (err) {
    console.error('Error in GET /workouts', err)
    return formatResponse(500)
  } finally {
    client.release()
  }
}

export const insertWorkout = async (userId: string, workoutData: IExercises[]) => {
  if (!workoutData) {
    return formatResponse(400, { message: 'Workout data is required' })
  }

  const client = await pool.connect()
  try {
    await client.query(`BEGIN`)
    const workout = await client.query(
      `INSERT INTO workouts (user_id, date) VALUES ($1, CURRENT_DATE) RETURNING workout_id`,
      [userId]
    )

    const workoutId = workout.rows[0].workout_id

    if (!workoutId) {
      await client.query(`ROLLBACK`)
      return formatResponse(422, { message: 'Failed to insert workout' })
    }

    for (const exercise of workoutData) {
      const exerciseResult = await client.query(
        `SELECT exercise_id FROM exercises WHERE name = $1 AND (user_id = $2 OR user_id IS NULL)`,
        [exercise.name, userId]
      )

      if (exerciseResult.rows.length === 0) {
        await client.query(`ROLLBACK`)
        return formatResponse(404, { message: 'Exercise name not found' })
      }

      const exerciseId = exerciseResult.rows[0].exercise_id

      for (let i = 0; i < exercise.sets.length; i++) {
        const set = exercise.sets[i]
        const workoutSetsResult = await client.query(
          `INSERT INTO workout_sets 
           (exercise_id, set_order, weight, reps, rpe, notes, workout_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7);`,
          [exerciseId, i + 1, set.weight, set.reps, set.rpe, exercise.notes, workoutId]
        )

        if (workoutSetsResult.rowCount !== 1) {
          await client.query(`ROLLBACK`)
          return formatResponse(422, { message: 'Failed to insert workout sets' })
        }
      }
    }
    await client.query(`COMMIT`)
    return formatResponse(201, { message: 'Workout inserted' })
  } catch (err) {
    await client.query(`ROLLBACK`)
    console.error('Error in POST /workouts', err)
    formatResponse(500)
  } finally {
    client.release()
  }
}
