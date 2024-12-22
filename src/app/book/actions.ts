"use server";

import db from "@/db/db";
import { AppointmentDao, CreateAppointmentDto } from "@/types/appointmentTypes";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";

export async function bookAppointment(
  data: CreateAppointmentDto
): Promise<{ data: AppointmentDao | null; error: string }> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: "Unauthorized", data: null };
  }
  const userId = session.user.id;
  console.log("userId: ", userId);
  const appointment = await db.appointment.create({
    data: {
      professionalId: data.professionalId,
      name: data.name,
      email: data.email,
      userId: userId,
      date: data.date,
      slotId: data.slotId,
    },
    select: {
      id: true,
      date: true,
      slotId: true,
      name: true,
      email: true,
      professionalId: true,
      slot: true,
    },
  });
  return { data: appointment, error: "" };
}
