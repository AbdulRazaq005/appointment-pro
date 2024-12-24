import { BookedAppointments } from "@/components/booked-appointments";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getAppointments } from "@/services/appointmentService";
import { Role } from "@prisma/client";
import { AppointmentDao } from "@/types/appointmentTypes";

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const role = session?.user?.role;
  if (!userId || !role) {
    redirect("/unauthorized");
  }
  let appointments: AppointmentDao[] = [];
  if (role === Role.PROFESSIONAL) {
    appointments = await getAppointments(userId, null);
  } else {
    appointments = await getAppointments(null, userId);
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Booked Appointments</h1>
      <BookedAppointments appointments={appointments} role={role} />
    </div>
  );
}
