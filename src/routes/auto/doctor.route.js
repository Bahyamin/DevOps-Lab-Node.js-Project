/**
 * Doctors API (data kept in memory).
 *  - GET    /api/doctors     -> list of doctors
 *  - GET    /api/doctors/:id -> one doctor (404 if not found)
 *  - POST   /api/doctors     -> add a doctor { name } (400 if missing)
 *  - PUT    /api/doctors/:id -> update a doctor { name } (404 / 400)
 *  - DELETE /api/doctors/:id -> remove a doctor (204, 404 if not found)
 *
 * Auto-mounted by app.js on '/', so full paths are declared here.
 */
import express, { Router } from 'express'

const router = Router()

const doctors = [
  { id: 1, name: 'Dr. Smith' },
  { id: 2, name: 'Dr. Martin' },
  { id: 3, name: 'Dr. Dupont' }
]

router.get('/api/doctors', (_req, res) => {
  res.status(200).json(doctors)
})

router.get('/api/doctors/:id', (req, res) => {
  const id = Number(req.params.id)
  const doctor = doctors.find(d => d.id === id)
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' })
  }
  res.status(200).json(doctor)
})

router.post('/api/doctors', express.json(), (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Missing required field: name' })
  }
  const newId = Math.max(...doctors.map(d => d.id)) + 1
  const newDoctor = { id: newId, name }
  doctors.push(newDoctor)
  res.status(201).json(newDoctor)
})

router.put('/api/doctors/:id', express.json(), (req, res) => {
  const id = Number(req.params.id)
  const index = doctors.findIndex(d => d.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Doctor not found' })
  }
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Missing required field: name' })
  }
  doctors[index] = { id, name }
  res.status(200).json(doctors[index])
})

router.delete('/api/doctors/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = doctors.findIndex(d => d.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Doctor not found' })
  }
  doctors.splice(index, 1)
  res.status(204).end()
})

export default router
