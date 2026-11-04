/**
 * Direct tests of the auto routers.
 * Each router is imported with `import` (instead of being loaded by app.js
 * with require) so that Vitest can measure its coverage.
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import infoRouter from '../src/routes/auto/info.route.js'
import versionRouter from '../src/routes/auto/version.route.js'
import boomRouter from '../src/routes/auto/boom.route.js'
import { errorHandler } from '../src/utils/errorHandler.js'

// Mini Express app that mounts only the given router
function makeApp (router) {
  const app = express()
  app.use('/', router)
  app.use(errorHandler)
  return app
}

describe('auto routers (mounted directly)', () => {
  it('GET /info returns name, version, node and uptime', async () => {
    const res = await request(makeApp(infoRouter)).get('/info')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('version')
    expect(res.body).toHaveProperty('node')
    expect(res.body).toHaveProperty('uptime')
  })

  it('GET /version returns a version string', async () => {
    const res = await request(makeApp(versionRouter)).get('/version')
    expect(res.status).toBe(200)
    expect(typeof res.body.version).toBe('string')
  })

  it('GET /boom returns a 500 with the error payload', async () => {
    const res = await request(makeApp(boomRouter)).get('/boom')
    expect(res.status).toBe(500)
    expect(res.body.error).toBe(true)
  })
})
