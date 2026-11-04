/**
 * Express app configuration.
 * Responsibilities:
 * - Base routes (/ , /health)
 * - Auto-mount all routers placed under src/routes/auto/*.route.js
 * - Global error handler (consistent JSON for errors)
 */
import express from 'express'
import { errorHandler } from './utils/errorHandler.js'

import versionRouter from './routes/auto/version.route.js'
import doctorRouter from './routes/auto/doctor.route.js'

const app = express()

app.use(express.json())

// Simple root + health endpoints
app.get('/', (_req, res) => res.json({ ok: true, message: 'Hello from CI/CD demo 🚀' }))
app.get('/health', (_req, res) => res.status(200).send('OK'))

app.use('/auto', versionRouter)
app.use('/auto', doctorRouter)

// Global error middleware last
app.use(errorHandler)

export default app
