import { NextFunction, Request, Response } from 'express'
import { formatResponse } from '../utils/utils'
import * as z from 'zod'

export const userIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.query.userId

  if (userId) {
    const userIdSchema = z.string().trim().min(1)
    const userIdValid = userIdSchema.safeParse({ userId })

    if (userIdValid) {
      next()
    } else {
      const { statusCode, ...response } = formatResponse(400, {
        message: 'UserID is not valid',
      })
      res.status(statusCode).json({ ...response })
    }
  } else {
    const { statusCode, ...response } = formatResponse(400, {
      message: 'UserID is required',
    })
    res.status(statusCode).json({ ...response })
  }
}
