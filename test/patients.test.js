/**
 * Tests for the Patients API (/api/patients).
 * Each test runs twice:
 *  - on the router imported directly (like routes.test.js), so Vitest measures its coverage
 *  - on the real app, to check that the router is auto-mounted by app.js
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app.js'
import patientsRouter from '../src/routes/auto/patients.route.js'
import { errorHandler } from '../src/utils/errorHandler.js'

function makeApp (router) {
  const a = express()
  a.use('/', router)
  a.use(errorHandler)
  return a
}

describe.each([
  ['router mounted directly', makeApp(patientsRouter)],
  ['real app (auto-mount)', app]
])('Patients API — %s', (_label, api) => {
  it('GET /api/patients returns an array', async () => {
    const res = await request(api).get('/api/patients')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('GET /api/patients/:id returns one patient', async () => {
    const res = await request(api).get('/api/patients/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id', 1)
    expect(res.body).toHaveProperty('name')
  })

  it('GET /api/patients/:id returns 404 when not found', async () => {
    const res = await request(api).get('/api/patients/9999')
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('error')
  })

  it('POST /api/patients adds a new patient', async () => {
    const res = await request(api)
      .post('/api/patients')
      .send({ name: 'Marie', age: 29 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toMatchObject({ name: 'Marie', age: 29 })

    const list = await request(api).get('/api/patients')
    expect(list.body.some(p => p.name === 'Marie')).toBe(true)
  })

  it('POST /api/patients returns 400 when fields are missing', async () => {
    const res = await request(api).post('/api/patients').send({ name: 'Paul' })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: 'Missing fields' })
  })

  it('POST /api/patients returns 400 when age is invalid', async () => {
    const res = await request(api)
      .post('/api/patients')
      .send({ name: 'Paul', age: 'abc' })
    expect(res.status).toBe(400)
  })
})
