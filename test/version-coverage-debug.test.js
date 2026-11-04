import { describe, it, expect } from 'vitest'
import express from 'express'
import request from 'supertest'
import router from '../src/routes/auto/version.route.js'

describe('Version route coverage diagnostic', () => {
  it('executes the version route directly', async () => {
    const app = express()
    app.use('/', router)
    const response = await request(app).get('/version')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('version')
  })
})
