import AppointmentBooking from "@/components/appointment-booking";
import AppointmentDetails from "@/components/appointment-details";
import db from "@/db/db";

async function fetchTimeSlotDetails() {
  const res = await db.slot.findMany({
    where: {
      // id: id,
    },
  });
  return res;
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | null };
}) {
  const professionalId = (await searchParams).professional as
    | string
    | undefined;
  const timeSlots = await fetchTimeSlotDetails();

  return (
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Book an Appointment
      </h1>
      <AppointmentDetails professionalId={professionalId} />
      <AppointmentBooking
        professionalId={professionalId}
        timeSlots={timeSlots}
      />
    </div>
  );
}
