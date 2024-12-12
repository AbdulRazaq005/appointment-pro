import AppointmentBooking from '@/components/appointment-booking'
import AppointmentDetails from '@/components/appointment-details'

export default function BookingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const professionalId = searchParams.professional as string | undefined

  return (
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Book an Appointment</h1>
      <AppointmentDetails professionalId={professionalId} />
      <AppointmentBooking professionalId={professionalId} />
    </div>
  )
}

