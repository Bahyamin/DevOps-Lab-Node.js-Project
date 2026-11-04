/**
 * Tests for /api/patients (GET and POST).
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('GET /api/patients', () => {
  it('returns 200 and an array', async () => {
    const res = await request(app).get('/api/patients')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})

describe('POST /api/patients', () => {
  it('creates a patient and returns 201 with an id', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ name: 'Julie', age: 40 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Julie')
    expect(res.body.age).toBe(40)
  })

  it('returns 400 when a field is missing', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ name: 'Julie' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing fields')
  })
})
