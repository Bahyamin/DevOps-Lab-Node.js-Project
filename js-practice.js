// Lab 5 - Part 2: JavaScript practice

// ----- 2.1 Variables -----
console.log('===== 2.1 Variables =====')

const hospitalName = 'Central Hospital'
const doctorCount = 12
let isOpen = true

if (isOpen) {
  console.log(`Welcome to ${hospitalName}! We have ${doctorCount} doctors currently available.`)
}

isOpen = false
if (!isOpen) {
  console.log(`Sorry, ${hospitalName} is closed right now. Please come back later.`)
}

// ----- 2.2 Arrays and loops -----
console.log('\n===== 2.2 Arrays and loops =====')

const doctors = ['Dr. Lee', 'Dr. Smith', 'Dr. Martin', 'Dr. Dupont', 'Dr. Garcia']

let i = 1
for (const doctor of doctors) {
  console.log(`Doctor #${i}: ${doctor}`)
  i++
}

doctors.push('Dr. Brown')
console.log(`New number of doctors: ${doctors.length}`)

function findDoctor (name) {
  if (doctors.includes(name)) {
    return 'Doctor found'
  }
  return 'Doctor not found'
}

console.log('findDoctor("Dr. Smith") ->', findDoctor('Dr. Smith'))
console.log('findDoctor("Dr. House") ->', findDoctor('Dr. House'))

// ----- 2.3 Objects -----
console.log('\n===== 2.3 Objects =====')

const patient = {
  name: 'Alice Martin',
  age: 34,
  conditions: ['diabetes', 'hypertension'],
  doctor: {
    name: 'Dr. Lee',
    specialty: 'Cardiology'
  }
}

console.log('Doctor name:', patient.doctor.name)
console.log('Number of conditions:', patient.conditions.length)
console.log(`${patient.name} is treated by ${patient.doctor.name} (${patient.doctor.specialty}).`)

patient.conditions.push('anxiety')
console.log('Updated patient:', patient)

// ----- 2.4 Array of objects -----
console.log('\n===== 2.4 Array of objects =====')

const patients = [
  { name: 'Alice', age: 34 },
  { name: 'John', age: 45 },
  { name: 'Marie', age: 29 }
]

function filterByAge (minAge) {
  return patients.filter(p => p.age > minAge)
}

function addPatient (name, age) {
  patients.push({ name, age })
}

console.log('Patients older than 30:', filterByAge(30))

addPatient('Paul', 52)
console.log('Updated patient list:', patients)

// ----- 2.6 Error handling -----
console.log('\n===== 2.6 Error handling =====')

function createAppointment (doctor, patient, date) {
  if (!doctor || !patient || !date) {
    throw new Error('Missing required fields')
  }
  return { doctor, patient, date }
}

try {
  const appointment = createAppointment('Dr. Lee', 'Alice Martin', '2026-11-10')
  console.log('Appointment created:', appointment)
} catch (err) {
  console.log('Error:', err.message)
}

try {
  const appointment = createAppointment('Dr. Lee', '', '2026-11-10')
  console.log('Appointment created:', appointment)
} catch (err) {
  console.log('Error:', err.message)
}

// ----- 2.7 Async / Promises -----
console.log('\n===== 2.7 Async / Promises =====')

function getHospitalData () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Central Hospital', uptime: 1234 })
    }, 1000)
  })
}

async function showData () {
  console.log('Fetching hospital data...')
  const data = await getHospitalData()
  console.log('Data loaded:', data)
}

showData()
