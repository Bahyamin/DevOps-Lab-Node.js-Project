/**
 * Tests for /api/patients (GET and POST).
 * Each test runs twice:
 *  - on the router imported directly (like routes.test.js), so Vitest measures its coverage
 *  - on the real app, to check that the router is auto-mounted by app.js
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app.js'
import patientsRouter from '../src/routes/auto/patients.route.js'

function makeApp (router) {
  const a = express()
  a.use('/', router)
  return a
}

describe.each([
  ['router mounted directly', makeApp(patientsRouter)],
  ['real app (auto-mount)', app]
])('Patients API - %s', (_label, api) => {
  it('GET /api/patients returns 200 and an array', async () => {
    const res = await request(api).get('/api/patients')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/patients returns 201 with an id', async () => {
    const res = await request(api)
      .post('/api/patients')
      .send({ name: 'Julie', age: 40 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Julie')
    expect(res.body.age).toBe(40)
  })

  it('POST /api/patients returns 400 when a field is missing', async () => {
    const res = await request(api)
      .post('/api/patients')
      .send({ name: 'Julie' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing fields')
  })
})
