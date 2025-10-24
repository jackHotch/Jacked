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
      `SELECT split_id, user_id, name, is_active, description, last_used_at FROM splits WHERE user_id = $1`,
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
    const currentSplit = await client.query(`SELECT name FROM splits WHERE is_active = 1 AND user_id = $1`, [userId])

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
    const currentSplitId = await client.query(`SELECT split_id FROM splits WHERE is_active = 1 AND user_id = $1`, [
      userId,
    ])

    if (currentSplitId.rowCount === 0) {
      return formatResponse(404, { message: 'No active split found' })
    }

    return formatResponse(200, { data: currentSplitId.rows[0] })
  } catch (err) {
    console.error('Error in GET /splits/current/id')
  } finally {
    client.release()
  }
}

export async function getAllSplitsSummary(userId: string) {
  const client = await pool.connect()

  try {
    const allSplitsSummary = await client.query(
      `
      SELECT
        s.name,
        s.description,
        s.is_active,
        s.last_used_at,
        s.created_at,
        COUNT(DISTINCT st.split_template_id) as total_template_days,
        COUNT(DISTINCT ste.split_template_exercise_id) as total_template_exercises,
        COUNT(DISTINCT w.workout_id) as total_workouts_completed,
        COUNT(DISTINCT ws.workout_set_id) as total_sets_logged,
        CASE
          WHEN s.last_used_at IS NULL THEN 'Never used'
          WHEN s.last_used_at::date = CURRENT_DATE THEN 'Today'
          WHEN s.last_used_at::date = CURRENT_DATE - 1 THEN '1 day ago'
          WHEN s.last_used_at::date > CURRENT_DATE - 7 THEN 
            (CURRENT_DATE - s.last_used_at::date) || 
            CASE WHEN (CURRENT_DATE - s.last_used_at::date) = 1 THEN ' day ago' ELSE ' days ago' END
          WHEN s.last_used_at::date > CURRENT_DATE - 30 THEN 
            ((CURRENT_DATE - s.last_used_at::date) / 7) || 
            CASE WHEN ((CURRENT_DATE - s.last_used_at::date) / 7) = 1 THEN ' week ago' ELSE ' weeks ago' END
          ELSE 
            ((CURRENT_DATE - s.last_used_at::date) / 30) || 
            CASE WHEN ((CURRENT_DATE - s.last_used_at::date) / 30) = 1 THEN ' month ago' ELSE ' months ago' END
        END as last_used_display
      FROM splits s
      LEFT JOIN split_templates st ON s.split_id = st.split_id
      LEFT JOIN split_template_exercises ste ON st.split_template_id = ste.split_template_id
      LEFT JOIN workouts w ON s.split_id = w.split_id
      LEFT JOIN workout_sets ws ON w.workout_id = ws.workout_id
      WHERE s.user_id = $1
      GROUP BY s.split_id, s.user_id, s.name, s.description, s.is_active, s.created_at, s.last_used_at;
      `,
      [userId]
    )

    if (allSplitsSummary.rowCount === 0) {
      return formatResponse(404, { message: 'No splits found' })
    }

    return formatResponse(200, { data: allSplitsSummary.rows })
  } catch (err) {
    console.error('Error in GET /splits/summary')
  } finally {
    client.release()
  }
}
