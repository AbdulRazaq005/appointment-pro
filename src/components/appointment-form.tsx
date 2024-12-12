import { useState } from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Appointment } from './appointment-booking'

type AppointmentFormProps = {
  onBook: (appointment: Omit<Appointment, 'id'>) => void
  selectedDate: Date | undefined
  selectedTime: string | undefined
}

export default function AppointmentForm({ onBook, selectedDate, selectedTime }: AppointmentFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDate && selectedTime && name && email) {
      onBook({ date: selectedDate, time: selectedTime, name, email })
      setName('')
      setEmail('')
    }
  }

  return (
    <Card className="bg-white bg-opacity-80 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Book an Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white bg-opacity-50 backdrop-blur-sm"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white bg-opacity-50 backdrop-blur-sm"
            />
          </div>
          <div>
            <Input
              type="text"
              value={selectedDate ? format(selectedDate, 'PPP') : ''}
              readOnly
              disabled
              className="bg-white bg-opacity-50 backdrop-blur-sm"
            />
          </div>
          <div>
            <Input
              type="text"
              value={selectedTime || ''}
              readOnly
              disabled
              className="bg-white bg-opacity-50 backdrop-blur-sm"
            />
          </div>
          <Button 
            type="submit" 
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Book Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

