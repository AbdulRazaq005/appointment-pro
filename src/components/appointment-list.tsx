import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Appointment } from './appointment-booking'

type AppointmentListProps = {
  appointments: Appointment[]
}

export default function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <Card className="bg-white bg-opacity-80 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Booked Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments booked yet.</p>
        ) : (
          <ul className="space-y-2">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-3 rounded-md bg-gradient-to-r from-gray-100 to-gray-200">
                <span className="font-medium text-gray-800">{appointment.name}</span>
                <div className="text-sm text-gray-600">
                  <p>{format(appointment.date, 'PPP')}</p>
                  <p>{appointment.time}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

