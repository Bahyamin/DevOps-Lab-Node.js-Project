/**
 * Tests for /api/metrics (GET).
 * Each test runs twice:
 *  - on the router imported directly, so Vitest measures its coverage
 *  - on the real app, to check that the router is auto-mounted by app.js
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app.js'
import metricsRouter from '../src/routes/auto/metrics.route.js'

function makeApp (router) {
  const a = express()
  a.use('/', router)
  return a
}

describe.each([
  ['router mounted directly', makeApp(metricsRouter)],
  ['real app (auto-mount)', app]
])('Metrics API - %s', (_label, api) => {
  it('GET /api/metrics returns 200 and a JSON object', async () => {
    const res = await request(api).get('/api/metrics')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/)
  })

  it('GET /api/metrics exposes uptime, timestamp and status', async () => {
    const res = await request(api).get('/api/metrics')
    expect(typeof res.body.uptime).toBe('number')
    expect(res.body.uptime).toBeGreaterThanOrEqual(0)
    expect(typeof res.body.timestamp).toBe('string')
    expect(['warming-up', 'healthy', 'steady']).toContain(res.body.status)
  })

  it('GET /api/metrics exposes system and hospital stats', async () => {
    const res = await request(api).get('/api/metrics')
    expect(res.body.system.node).toBe(process.version)
    expect(typeof res.body.system.memoryUsageMb).toBe('number')
    expect(res.body.hospital).toHaveProperty('doctors')
    expect(res.body.hospital).toHaveProperty('patients')
  })
})
