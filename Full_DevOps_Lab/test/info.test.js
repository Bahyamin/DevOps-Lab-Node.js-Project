/**

Integration test for GET /info.

Validates the merged info object from helpers.
*/
import request from 'supertest'
import app from '../src/app.js'
import { getPackageInfo, getRuntimeInfo } from '../src/utils/appInfo.js'
import { describe, it, expect } from 'vitest'

describe('GET /info', () => {
  it('returns app info with expected fields', async () => {
    const res = await request(app).get('/info')
    const packageInfo = getPackageInfo()
    const runtimeInfo = getRuntimeInfo()

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(packageInfo.name)
    expect(res.body.version).toBe(packageInfo.version)
    expect(typeof res.body.node).toBe('string')
    expect(typeof res.body.uptime).toBe('number')
    expect(res.body.node).toBe(runtimeInfo.node)
    expect(res.body.uptime).toBeGreaterThanOrEqual(0)
  })

  it('returns a valid Node.js version and non-negative uptime', async () => {
    const res = await request(app).get('/info')

    expect(res.body.node).toMatch(/^v\d+\.\d+\.\d+/)
    expect(res.body.uptime).toBeGreaterThanOrEqual(0)
  })
})
