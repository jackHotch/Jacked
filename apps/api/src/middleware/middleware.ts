import { NextFunction, Request, Response } from 'express'
import { formatResponse } from '../utils/utils'

export const userIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.userId) {
    next()
  } else {
    const { statusCode, ...response } = formatResponse(400, {
      message: 'UserID is required',
    })
    res.status(statusCode).json({ ...response })
  }
}
