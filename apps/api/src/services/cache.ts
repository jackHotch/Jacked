const redis = require('../config/redis')

class CacheService {
  async get(key: string) {
    try {
      const data = await redis.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set(key: string, value: any, ttlSeconds = 3600) {
    try {
      await redis.setEx(key, ttlSeconds, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Cache set error:', error)
      return false
    }
  }

  async del(key: string) {
    try {
      await redis.del(key)
      return true
    } catch (error) {
      console.error('Cache delete error:', error)
      return false
    }
  }

  async delPattern(pattern) {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(keys)
      }
      return true
    } catch (error) {
      console.error('Cache delete pattern error:', error)
      return false
    }
  }

  // Workout-specific helpers
  getUserProfileKey(userId) {
    return `user:${userId}:profile`
  }

  getWorkoutHistoryKey(userId) {
    return `user:${userId}:workouts:recent`
  }

  getExerciseKey(exerciseId) {
    return `exercise:${exerciseId}`
  }

  async cacheUserProfile(userId, profile, ttl = 3600) {
    return this.set(this.getUserProfileKey(userId), profile, ttl)
  }

  async getUserProfile(userId) {
    return this.get(this.getUserProfileKey(userId))
  }

  async invalidateUserCache(userId) {
    return this.delPattern(`user:${userId}:*`)
  }
}

export default new CacheService()
