import bcrypt from "bcrypt";
import db from "@/db/db";
import { SignUpDto } from "@/types/signupTypes";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body: SignUpDto = await req.json();
  const { name, email, password } = body;
  console.log(name, email, password);
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
      role: Role.USER,
    },
  });
  return NextResponse.json({ data: { sucess: true } }, { status: 200 });
}
