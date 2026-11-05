import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import doctorRouter from '../../src/routes/auto/doctor.route.js'

function makeApp(router) {
  const app = express()
  app.use('/', router)
  return app
}
const api = makeApp(doctorRouter)

describe('Doctor API', () => {
  it('GET / returns all doctors', async () => {
    const res = await request(api).get('/')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST / creates new doctor with valid name', async () => {
    const res = await request(api)
      .post('/')
      .send({ name: 'Dr. Test' })
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Dr. Test')
  })

  it('POST / returns 400 without name', async () => {
    const res = await request(api)
      .post('/')
      .send({})
    // 打印看真实结果！
    console.log('status:', res.status)
    console.log('body:', res.body)
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Missing required field: name')
  })
})
