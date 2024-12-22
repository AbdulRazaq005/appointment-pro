import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type SignUpDto = z.infer<typeof signUpSchema>;

export const professionalSignUpSchema = signUpSchema.extend({
  profession: z.object({
    specialisation: z.string().nonempty(),
    phoneNo: z.string().min(6, "Phone number must be at least 6 digits"),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    fee: z.number().min(0),
    licenseNumber: z.string().nonempty(),
  }),
});
export type ProfessionalSignUpDto = z.infer<typeof professionalSignUpSchema>;
