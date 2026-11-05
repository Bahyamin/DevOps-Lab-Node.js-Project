import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../src/app.js'

describe('Doctors API', () => {
  it('GET /api/doctors returns an array', async () => {
    const res = await request(app).get('/api/doctors')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/doctors/:id returns one doctor', async () => {
    const res = await request(app).get('/api/doctors/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
  })

  it('GET /api/doctors/:id returns 404 when not found', async () => {
    const res = await request(app).get('/api/doctors/999')
    expect(res.status).toBe(404)
    expect(res.body.error).toBe('Doctor not found')
  })

  it('POST /api/doctors creates a doctor', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .send({ name: 'Dr. Julie', specialty: 'Neurology' })
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Dr. Julie')
    expect(res.body.specialty).toBe('Neurology')
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/doctors returns 400 when a field is missing', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .send({ name: 'Dr. Dave' })
    expect(res.status).toBe(400)
  })

  it('PUT /api/doctors/:id updates a doctor', async () => {
    const res = await request(app)
      .put('/api/doctors/2')
      .send({ name: 'Dr. Updated', specialty: 'Oncology' })
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Dr. Updated')
    expect(res.body.specialty).toBe('Oncology')
  })

  it('PUT /api/doctors/:id returns 404 when not found', async () => {
    const res = await request(app)
      .put('/api/doctors/999')
      .send({ name: 'X', specialty: 'Y' })
    expect(res.status).toBe(404)
  })

  it('PUT /api/doctors/:id returns 400 when a field is missing', async () => {
    const res = await request(app)
      .put('/api/doctors/1')
      .send({ name: 'Only name' })
    expect(res.status).toBe(400)
  })

  it('DELETE /api/doctors/:id removes a doctor', async () => {
    const created = await request(app)
      .post('/api/doctors')
      .send({ name: 'Dr. Temp', specialty: 'Temp' })
    const res = await request(app).delete(`/api/doctors/${created.body.id}`)
    expect(res.status).toBe(204)
    const check = await request(app).get(`/api/doctors/${created.body.id}`)
    expect(check.status).toBe(404)
  })

  it('DELETE /api/doctors/:id returns 404 when not found', async () => {
    const res = await request(app).delete('/api/doctors/999')
    expect(res.status).toBe(404)
  })
})
