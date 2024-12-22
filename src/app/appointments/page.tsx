import { BookedAppointments } from "@/components/booked-appointments";

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Booked Appointments</h1>
      <BookedAppointments />
    </div>
  );
}
