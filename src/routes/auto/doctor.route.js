import express, { Router } from 'express'

const router = Router()
router.use(express.json())

const doctors = [
  { id: 1, name: 'Dr. Alice', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Bob', specialty: 'Neurology' }
]

router.get('/doctor', (req, res) => {
  res.status(200).json(doctors)
})

router.post('/doctor', (req, res) => {
  const { name, specialty } = req.body

  if (!name || !specialty) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const newDoctor = {
    id: doctors.length + 1,
    name,
    specialty
  }

  doctors.push(newDoctor)
  res.status(201).json(newDoctor)
})

export default router
