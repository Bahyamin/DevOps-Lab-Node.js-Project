/**
 * Tests for the Appointments API (/api/appointments).
 * Each test runs twice:
 *  - on the router imported directly (like routes.test.js), so Vitest measures its coverage
 *  - on the real app, to check that the router is auto-mounted by app.js
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app.js'
import appointmentsRouter from '../src/routes/auto/appointments.route.js'
import { errorHandler } from '../src/utils/errorHandler.js'

function makeApp (router) {
  const a = express()
  a.use('/', router)
  a.use(errorHandler)
  return a
}

describe.each([
  ['router mounted directly', makeApp(appointmentsRouter)],
  ['real app (auto-mount)', app]
])('Appointments API — %s', (_label, api) => {
  it('GET /api/appointments returns an array', async () => {
    const res = await request(api).get('/api/appointments')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('GET /api/appointments/:id returns one appointment', async () => {
    const res = await request(api).get('/api/appointments/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id', 1)
    expect(res.body).toHaveProperty('doctor')
    expect(res.body).toHaveProperty('patient')
    expect(res.body).toHaveProperty('date')
  })

  it('GET /api/appointments/:id returns 404 when not found', async () => {
    const res = await request(api).get('/api/appointments/9999')
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })

  it('POST /api/appointments schedules a new appointment', async () => {
    const body = { doctor: 'Dr. Amir Khan', patient: 'John', date: '2026-11-12T14:30' }
    const res = await request(api).post('/api/appointments').send(body)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toMatchObject(body)

    const list = await request(api).get('/api/appointments')
    expect(list.body.some(a => a.patient === 'John')).toBe(true)
  })

  it('POST /api/appointments returns 400 when fields are missing', async () => {
    const res = await request(api)
      .post('/api/appointments')
      .send({ doctor: 'Dr. Amir Khan' })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: 'Missing required fields' })
  })

  it('POST /api/appointments returns 400 when date is invalid', async () => {
    const res = await request(api)
      .post('/api/appointments')
      .send({ doctor: 'Dr. Amir Khan', patient: 'John', date: 'not-a-date' })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: 'Invalid date' })
  })

  it('POST /api/appointments returns 409 when the doctor is already booked', async () => {
    const res = await request(api)
      .post('/api/appointments')
      .send({ doctor: 'Dr. Sarah Lee', patient: 'Marie', date: '2026-11-10T10:00' })
    expect(res.status).toBe(409)
    expect(res.body).toHaveProperty('error')
  })
})
