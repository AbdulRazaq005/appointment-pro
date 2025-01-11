import AppointmentBooking from "@/components/appointment-booking";
import AppointmentDetails from "@/components/appointment-details";
import db from "@/db/db";
import { Professional } from "@/types/userTypes";
import { binaryToWorkingDays } from "@/utils/configurationUtils";
import { Role, Slot } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { AppointmentDao } from "@/types/appointmentTypes";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ professional: string | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const professionalId = (await searchParams).professional as
    | string
    | undefined;
  let timeSlots: Slot[] = [];
  let professionalDetails = null;
  let workingDays: number[] = [];
  let bookedAppointments: AppointmentDao[] = [];

  if (professionalId) {
    professionalDetails = await fetchProfessionalDetails(professionalId);
    timeSlots = await fetchTimeSlots(professionalId);
    workingDays = binaryToWorkingDays(
      professionalDetails?.profession?.workingDays
    );
    bookedAppointments = await fetchBookedAppointments(professionalId);
  }
  return (
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Book an Appointment
      </h1>
      <AppointmentDetails professional={professionalDetails} />
      <AppointmentBooking
        userId={userId}
        professionalId={professionalId}
        timeSlots={timeSlots}
        workingDays={workingDays}
        bookedAppointments={bookedAppointments}
      />
    </div>
  );
}

async function fetchTimeSlots(id: string) {
  const res = await db.slot.findMany({
    where: {
      userId: id,
      isActive: true,
    },
  });
  return res;
}
async function fetchProfessionalDetails(
  id: string
): Promise<Professional | null> {
  const res = await db.user.findUnique({
    where: {
      id: id,
      role: Role.PROFESSIONAL,
    },
    include: {
      profession: true,
    },
  });
  return res;
}
async function fetchBookedAppointments(professionalId: string) {
  const res = await db.appointment.findMany({
    where: {
      // userId: userId,
      professionalId: professionalId,
    },
    include: {
      slot: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  return res;
}
