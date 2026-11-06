/**
 * Metrics API.
 *  - GET /api/metrics -> system and hospital stats
 *
 * Auto-mounted by app.js on '/', so the full path is declared here.
 */
import os from 'node:os'
import { Router } from 'express'
import { formatStatus } from '../../utils/status.js'

const router = Router()

// Hospital figures kept in memory (the other routes keep their data in memory too)
const hospital = {
  name: 'Central Hospital',
  doctors: 2,
  patients: 2,
  appointments: 0
}

router.get('/api/metrics', (_req, res) => {
  const uptime = Math.floor(process.uptime())

  res.status(200).json({
    timestamp: new Date().toISOString(),
    uptime,
    status: formatStatus(uptime),
    system: {
      node: process.version,
      platform: process.platform,
      memoryUsageMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
      cpuCount: os.cpus().length
    },
    hospital
  })
})

export default router
