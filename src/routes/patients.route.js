/**
 * /api/patients routes (data kept in memory).
 * GET  /api/patients -> list of patients
 * POST /api/patients -> add a patient { name, age }
 */
import { Router } from 'express'

const router = Router()

const patients = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'John', age: 45 }
]

router.get('/', (_req, res) => {
  res.status(200).json(patients)
})

router.post('/', (req, res) => {
  const { name, age } = req.body

  if (!name || !age) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  const newPatient = { id: patients.length + 1, name, age }
  patients.push(newPatient)
  res.status(201).json(newPatient)
})

export default router
