import { createClient } from 'redis'

let cachingEnabled = true

const redisConfig = process.env.REDIS_HOST
  ? { url: process.env.REDIS_HOST }
  : {
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }

export const redis = createClient(redisConfig)

redis.on('error', (err) => console.log('Redis Client Error', err))

redis.on('connect', () => console.log('Connected to Redis'))

redis.on('ready', () => console.log('Redis client ready'))
;(async () => {
  try {
    await redis.connect()
  } catch (err) {
    console.error('Failed to connect to Redis:', err)
  }
})()

process.on('SIGINT', async () => {
  await redis.quit()
  process.exit(0)
})

export async function getCache(key: string) {
  if (cachingEnabled) {
    try {
      return await redis.json.get(key)
    } catch (err) {
      console.error('Cache GET error:', err)
      return null
    }
  }

  return null
}

export async function setCache(key: string, value: any, ttl?: number) {
  if (!cachingEnabled) {
    return false
  }

  try {
    if (ttl) {
      await redis.json.set(key, '$', value)
      await redis.expire(key, ttl)
    } else {
      await redis.json.set(key, '$', value)
    }
    return true
  } catch (error) {
    console.error('Cache set error:', error)
    return false
  }
}

export function enableCaching() {
  cachingEnabled = true
}

export function disableCaching() {
  cachingEnabled = false
}

export function isCachingEnabled() {
  return cachingEnabled
}

export async function clearAllCache() {
  try {
    await redis.flushDb()
    return true
  } catch (error) {
    return false
  }
}
