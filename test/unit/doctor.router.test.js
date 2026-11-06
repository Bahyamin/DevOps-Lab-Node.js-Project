/**
 * Tests for the doctors router imported directly.
 * app.js loads the routes with require, so Vitest does not measure
 * doctor.route.js when it is only reached through app. Importing the
 * router here (like routes.test.js) makes its coverage count.
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import doctorsRouter from '../../src/routes/auto/doctor.route.js'

const app = express()
app.use('/', doctorsRouter)

describe('Doctors router (mounted directly)', () => {
  it('GET /api/doctors returns an array', async () => {
    const res = await request(app).get('/api/doctors')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/doctors/:id returns one doctor or 404', async () => {
    const found = await request(app).get('/api/doctors/1')
    expect(found.status).toBe(200)
    expect(found.body.id).toBe(1)

    const missing = await request(app).get('/api/doctors/999')
    expect(missing.status).toBe(404)
  })

  it('POST /api/doctors creates a doctor', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .send({ name: 'Dr. Julie', specialty: 'Neurology' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  it('POST /api/doctors returns 400 when name or specialty is missing', async () => {
    const noName = await request(app).post('/api/doctors').send({ specialty: 'Neurology' })
    expect(noName.status).toBe(400)

    const noSpecialty = await request(app).post('/api/doctors').send({ name: 'Dr. Dave' })
    expect(noSpecialty.status).toBe(400)
  })

  it('PUT /api/doctors/:id updates a doctor', async () => {
    const res = await request(app)
      .put('/api/doctors/2')
      .send({ name: 'Dr. Updated', specialty: 'Oncology' })
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Dr. Updated')
  })

  it('PUT /api/doctors/:id returns 404 or 400', async () => {
    const missing = await request(app)
      .put('/api/doctors/999')
      .send({ name: 'X', specialty: 'Y' })
    expect(missing.status).toBe(404)

    const noName = await request(app).put('/api/doctors/1').send({ specialty: 'Y' })
    expect(noName.status).toBe(400)

    const noSpecialty = await request(app).put('/api/doctors/1').send({ name: 'X' })
    expect(noSpecialty.status).toBe(400)
  })

  it('DELETE /api/doctors/:id removes a doctor or returns 404', async () => {
    const created = await request(app)
      .post('/api/doctors')
      .send({ name: 'Dr. Temp', specialty: 'Temp' })
    const res = await request(app).delete(`/api/doctors/${created.body.id}`)
    expect(res.status).toBe(204)

    const missing = await request(app).delete('/api/doctors/999')
    expect(missing.status).toBe(404)
  })
})
