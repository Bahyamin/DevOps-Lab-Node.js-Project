import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../src/app.js'

describe('GET /doctor', () => {
  it('should return all doctors with 200 status', async () => {
    const response = await request(app).get('/doctor')
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe('POST /doctor', () => {
  it('should create new doctor and return 201', async () => {
    const newDoc = { name: 'Dr. Charlie', specialty: 'Dermatology' }
    const response = await request(app)
      .post('/doctor')
      .send(newDoc)
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newDoc.name)
    expect(response.body).toHaveProperty('id')
  })

  it('should return 400 if missing fields', async () => {
    const response = await request(app)
      .post('/doctor')
      .send({ name: 'Dr. Dave' })
    expect(response.statusCode).toBe(400)
  })
})
