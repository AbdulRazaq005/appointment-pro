import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const professionals = {
  '1': { name: 'Dr. Jane Smith', specialty: 'General Practitioner' },
  '2': { name: 'Dr. John Doe', specialty: 'Dentist' },
  '3': { name: 'Dr. Emily Brown', specialty: 'Psychologist' },
  '4': { name: 'Dr. Michael Lee', specialty: 'Dermatologist' },
}

export default function AppointmentDetails({ professionalId }: { professionalId?: string }) {
  const professional = professionalId ? professionals[professionalId as keyof typeof professionals] : null

  return (
    <Card className="bg-white bg-opacity-80 backdrop-blur-lg mb-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Your Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        {professional ? (
          <div>
            <p className="text-gray-600">You are booking an appointment with:</p>
            <p className="font-bold text-gray-800">{professional.name}</p>
            <p className="text-gray-600">{professional.specialty}</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">No professional selected.</p>
            <Link href="/professionals" className="text-blue-500 hover:underline">Choose a professional</Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

