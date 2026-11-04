// Lab 5 - Exercise 2.5: import the doctors module
import { doctors, addDoctor } from './hospitalData.js'

console.log('===== 2.5 Modules =====')
console.log('Doctors:', doctors)

addDoctor('Dr. Lee')
console.log('Updated doctors:', doctors)
