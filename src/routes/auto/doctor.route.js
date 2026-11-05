/**
 * Doctors API (data kept in memory).
 *  - GET    /api/doctors     -> list of doctors
 *  - GET    /api/doctors/:id -> one doctor (404 if not found)
 *  - POST   /api/doctors     -> add a doctor { name, specialty } (400 if a field is missing)
 *  - PUT    /api/doctors/:id -> update a doctor { name, specialty } (404 / 400)
 *  - DELETE /api/doctors/:id -> remove a doctor (204, 404 if not found)
 *
 * Auto-mounted by app.js on '/', so full paths are declared here.
 */
import express, { Router } from 'express'

const router = Router()

const doctors = [
  { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Martin', specialty: 'Pediatrics' },
  { id: 3, name: 'Dr. Dupont', specialty: 'Neurology' }
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
  const { name, specialty } = req.body
  if (!name || !specialty) {
    return res.status(400).json({ error: 'Missing required fields: name, specialty' })
  }
  const newId = Math.max(...doctors.map(d => d.id)) + 1
  const newDoctor = { id: newId, name, specialty }
  doctors.push(newDoctor)
  res.status(201).json(newDoctor)
})

router.put('/api/doctors/:id', express.json(), (req, res) => {
  const id = Number(req.params.id)
  const index = doctors.findIndex(d => d.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Doctor not found' })
  }
  const { name, specialty } = req.body
  if (!name || !specialty) {
    return res.status(400).json({ error: 'Missing required fields: name, specialty' })
  }
  doctors[index] = { id, name, specialty }
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
