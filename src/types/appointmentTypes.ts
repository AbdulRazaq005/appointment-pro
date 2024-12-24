import { z } from "zod";

export const createAppointmentSchema = z.object({
  professionalId: z.string().nonempty(),
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  date: z.date(),
  slotId: z.string().nonempty(),
});
export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;

export const appointmentDaoSchema = z.object({
  professionalId: z.string().nonempty(),
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  date: z.date(),
  slotId: z.string().nonempty(),
  slot: z.object({
    from: z.date(),
    to: z.date(),
  }),
  professional: z
    .object({
      name: z.string().nonempty(),
      specialisation: z.string().nonempty(),
      city: z.string().nonempty(),
      state: z.string().nonempty(),
      fee: z.number(),
    })
    .optional(),
});
export type AppointmentDao = z.infer<typeof appointmentDaoSchema>;
