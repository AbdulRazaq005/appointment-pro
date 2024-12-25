import bcrypt from "bcrypt";
import db from "@/db/db";
import {
  ProfessionalSignUpDto,
  professionalSignUpSchema,
} from "@/types/signupTypes";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body: ProfessionalSignUpDto = await req.json();
  const parseResult = professionalSignUpSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        data: {
          error: parseResult.error.errors.map((e) => e.message).join(", "),
        },
      },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(parseResult.data.password, 10);
  await db.user.create({
    data: {
      name: parseResult.data.name,
      email: parseResult.data.email,
      passwordHash: hashedPassword,
      role: Role.PROFESSIONAL,
      profession: {
        create: parseResult.data.profession,
      },
    },
  });

  return NextResponse.json({ data: { sucess: true } }, { status: 200 });
}
