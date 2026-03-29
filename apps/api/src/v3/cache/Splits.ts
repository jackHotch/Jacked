import { redis } from '../../config/redis'

export function getAllSplitsSummaryKey(userId: string) {
  return `splits:${userId}:summary`
}

export async function invalidateUserSplits(userId: string) {
  const pattern = `splits:${userId}:*`
  const keys = await redis.keys(pattern)

  if (keys.length > 0) {
    await redis.del(keys)
  }
}
