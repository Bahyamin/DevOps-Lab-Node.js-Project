/**
 * Patients API (in-memory data).
 *  - GET  /api/patients      → list all patients
 *  - GET  /api/patients/:id  → one patient (404 if not found)
 *  - POST /api/patients      → add a patient { name, age } (400 if invalid)
 *
 * Auto-mounted by app.js on '/', so full paths are declared here.
 */
import express, { Router } from 'express'

const router = Router()

const patients = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'John', age: 45 }
]

// GET all patients
router.get('/api/patients', (_req, res) => {
  res.status(200).json(patients)
})

// GET one patient by id
router.get('/api/patients/:id', (req, res) => {
  const id = Number(req.params.id)
  const patient = patients.find(p => p.id === id)
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' })
  }
  res.status(200).json(patient)
})

// POST a new patient (express.json() parses the body for this route only)
router.post('/api/patients', express.json(), (req, res) => {
  const { name, age } = req.body
  if (!name || age === undefined) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  if (typeof age !== 'number' || age < 0) {
    return res.status(400).json({ error: 'Age must be a positive number' })
  }
  const newPatient = { id: patients.length + 1, name, age }
  patients.push(newPatient)
  res.status(201).json(newPatient)
})

export default router
