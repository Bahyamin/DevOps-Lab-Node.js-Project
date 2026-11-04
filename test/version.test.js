import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('GET /version endpoint', () => {
  it('returns status 200 and version property', async () => {
    const response = await request(app).get('/version')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('version')
  })
})
