import express, { Request, Response, Router } from 'express'
import { disableCaching, enableCaching, isCachingEnabled } from '../../config/redis'
const router: Router = express.Router()

router.get('cache/status', (req: Request, res: Response) => {
  res.status(200).json({ enabled: isCachingEnabled() })
})

router.post('/cache/enable', (req: Request, res: Response) => {
  enableCaching()
  res.status(200).json({ success: true })
})

router.post('/cache/disable', (req: Request, res: Response) => {
  disableCaching()
  res.status(200).json({ success: true })
})

router.post('/cache/toggle', (req: Request, res: Response) => {
  const isEnabled = isCachingEnabled()

  if (isEnabled) {
    disableCaching()
  } else {
    enableCaching()
  }

  res.json({
    success: true,
    enabled: !isEnabled,
  })
})
