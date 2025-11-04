import { createClient } from 'redis'

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
