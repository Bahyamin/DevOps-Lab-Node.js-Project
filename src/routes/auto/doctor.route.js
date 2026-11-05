import express from 'express'
const router = express.Router()

router.use(express.json())

const doctors = [
  { id: 1, name: 'Dr. Smith' },
  { id: 2, name: 'Dr. Martin' },
  { id: 3, name: 'Dr. Dupont' }
]

router.get('/', (req, res) => {
  res.status(200).json(doctors)
})

router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400).json({ error: 'Missing required field: name' })
  } else {
    const newId = Math.max(...doctors.map(d => d.id)) + 1
    const newDoctor = { id: newId, name }
    doctors.push(newDoctor)
    res.status(201).json(newDoctor)
  }
})

export default router
