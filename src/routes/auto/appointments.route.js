/**
 * Appointments API (in-memory data).
 * Schedules visits between a doctor and a patient.
 *  - GET  /api/appointments      → list all appointments
 *  - GET  /api/appointments/:id  → one appointment (404 if not found)
 *  - POST /api/appointments      → book { doctor, patient, date }
 *      400 if fields are missing or date is invalid
 *      409 if the doctor already has an appointment at that date
 *
 * Auto-mounted by app.js on '/', so full paths are declared here.
 */
import express, { Router } from 'express'

const router = Router()

const appointments = [
  { id: 1, doctor: 'Dr. Sarah Lee', patient: 'Alice', date: '2026-11-10T10:00' }
]

// GET all appointments
router.get('/api/appointments', (_req, res) => {
  res.status(200).json(appointments)
})

// GET one appointment by id
router.get('/api/appointments/:id', (req, res) => {
  const id = Number(req.params.id)
  const appointment = appointments.find(a => a.id === id)
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' })
  }
  res.status(200).json(appointment)
})

// POST a new appointment (express.json() parses the body for this route only)
router.post('/api/appointments', express.json(), (req, res) => {
  const { doctor, patient, date } = req.body
  if (!doctor || !patient || !date) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (Number.isNaN(Date.parse(date))) {
    return res.status(400).json({ error: 'Invalid date' })
  }
  const alreadyBooked = appointments.some(a => a.doctor === doctor && a.date === date)
  if (alreadyBooked) {
    return res.status(409).json({ error: 'Doctor already booked at this date' })
  }
  const newAppointment = { id: appointments.length + 1, doctor, patient, date }
  appointments.push(newAppointment)
  res.status(201).json(newAppointment)
})

export default router
