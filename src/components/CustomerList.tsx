import React, { useState, useEffect } from 'react'

interface Customer {
  id: number
  name: string
  email: string
  appointmentHistory: string[]
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers')
      if (response.ok) {
        const data = await response.json()
        setCustomers(data)
      } else {
        throw new Error('Failed to fetch customers')
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Appointment History</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id} className="border-b">
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.email}</td>
              <td className="p-2">
                <ul>
                  {customer.appointmentHistory.map((appointment, index) => (
                    <li key={index}>{appointment}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerList