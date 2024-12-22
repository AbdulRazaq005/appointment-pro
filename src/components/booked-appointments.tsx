'use client'

import { useState, useEffect } from 'react'
import { format, parseISO, isWithinInterval } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Appointment {
  id: string
  doctorName: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

export function BookedAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()

  useEffect(() => {
    // Simulating an API call to fetch appointments
    const fetchAppointments = async () => {
      // In a real application, you would fetch this data from your backend
      const mockAppointments: Appointment[] = [
        { id: '1', doctorName: 'Dr. Smith', date: '2023-06-15', time: '10:00', status: 'confirmed' },
        { id: '2', doctorName: 'Dr. Johnson', date: '2023-06-18', time: '14:30', status: 'pending' },
        { id: '3', doctorName: 'Dr. Williams', date: '2023-06-20', time: '11:15', status: 'confirmed' },
        { id: '4', doctorName: 'Dr. Brown', date: '2023-06-25', time: '09:00', status: 'confirmed' },
        { id: '5', doctorName: 'Dr. Davis', date: '2023-06-30', time: '16:45', status: 'cancelled' },
      ]
      setAppointments(mockAppointments)
      setFilteredAppointments(mockAppointments)
    }

    fetchAppointments()
  }, [])

  useEffect(() => {
    filterAppointments()
  }, [fromDate, toDate, appointments])

  const filterAppointments = () => {
    let filtered = appointments

    if (fromDate && toDate) {
      filtered = appointments.filter((appointment) => {
        const appointmentDate = parseISO(appointment.date)
        return isWithinInterval(appointmentDate, { start: fromDate, end: toDate })
      })
    }

    setFilteredAppointments(filtered)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : <span>From date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : <span>To date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          onClick={() => {
            setFromDate(undefined)
            setToDate(undefined)
          }}
          variant="outline"
        >
          Clear Filters
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Doctor</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Time</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="border p-2">{appointment.doctorName}</td>
                <td className="border p-2">{format(parseISO(appointment.date), 'MMMM d, yyyy')}</td>
                <td className="border p-2">{appointment.time}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${appointment.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                      appointment.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAppointments.length === 0 && (
          <p className="text-center py-4">No appointments found for the selected date range.</p>
        )}
      </div>
    </div>
  )
}

