import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import db from "@/db/db";
import { AppointmentDao, CreateAppointmentDto } from "@/types/appointmentTypes";
import { getServerSession } from "next-auth";

export async function getAppointments(
  professionalId: string | null,
  userId: string | null,
  skip: number = 0,
  take: number = 10
): Promise<AppointmentDao[]> {
  if (!professionalId && !userId) {
    return [];
  }
  const filters: { professionalId?: string; userId?: string } = {};
  if (professionalId) {
    filters.professionalId = professionalId;
  }
  if (userId) {
    filters.userId = userId;
  }
  const data = await db.appointment.findMany({
    where: filters,
    orderBy: {
      date: "desc",
    },
    select: {
      userId: true,
      professionalId: true,
      name: true,
      email: true,
      date: true,
      slotId: true,
      slot: {
        select: {
          id: true,
          from: true,
          to: true,
        },
      },
      professional: {
        select: {
          name: true,
          profession: {
            select: {
              specialisation: true,
              city: true,
              state: true,
              fee: true,
            },
          },
        },
      },
    },
    skip,
    take,
  });

  const result = data.map((item) => {
    return {
      ...item,
      professional: {
        name: item.professional.name,
        specialisation: item.professional.profession?.specialisation || "",
        city: item.professional.profession?.city || "",
        state: item.professional.profession?.state || "",
        fee: item.professional.profession?.fee || 0,
      },
    };
  });

  return result;
}

export async function bookAppointment(
  data: CreateAppointmentDto
): Promise<{ data: AppointmentDao | null; error: string }> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: "Unauthorized", data: null };
  }
  const userId = session.user.id;
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
      userId: true,
      slot: true,
    },
  });
  return { data: appointment, error: "" };
}
