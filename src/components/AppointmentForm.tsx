import React, { useState } from 'react'

interface Appointment {
  date: string
  time: string
  service: string
  customerName: string
  customerEmail: string
}

const AppointmentForm: React.FC = () => {
  const [appointment, setAppointment] = useState<Appointment>({
    date: '',
    time: '',
    service: '',
    customerName: '',
    customerEmail: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAppointment(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      })
      if (response.ok) {
        const result = await response.json()
        console.log('Appointment booked:', result)
        alert('Appointment booked successfully!')
        setAppointment({
          date: '',
          time: '',
          service: '',
          customerName: '',
          customerEmail: '',
        })
      } else {
        throw new Error('Failed to book appointment')
      }
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('Failed to book appointment. Please try again.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields remain the same */}
      </form>
    </div>
  )
}

export default AppointmentForm