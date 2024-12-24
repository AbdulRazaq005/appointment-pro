import { Slot } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/authOptions";
import db from "@/db/db";
import { workingDaysToBinary } from "@/utils/configurationUtils";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   const profession = await db.profession.findFirst({
//     where: {
//       userId: session.user.id,
//     },
//   });

//   if (!profession) {
//     return NextResponse.json(
//       { message: "No profession found" },
//       { status: 404 }
//     );
//   }

//   const timeSlots = await db.slot.findMany({
//     where: {
//       userId: session.user.id,
//     },
//     select: {
//       from: true,
//       to: true,
//     },
//   });

//   return NextResponse.json({
//     daysOfWeek: binaryToWorkingDays(profession.workingDays),
//     timeSlots,
//   });
// }

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { daysOfWeek, timeSlots }: { daysOfWeek: number[]; timeSlots: Slot[] } =
    await req.json();

  if (daysOfWeek.length === 0 || timeSlots.length === 0) {
    return NextResponse.json(
      { message: "Days of week and time slots cannot be empty" },
      { status: 400 }
    );
  }

  await db.profession.update({
    where: {
      userId: session.user.id,
    },
    data: {
      workingDays: workingDaysToBinary(daysOfWeek),
    },
  });

  await db.slot.updateMany({
    where: {
      userId: session.user.id,
    },
    data: {
      isActive: false,
    },
  });

  await db.slot.createMany({
    data: timeSlots.map((slot) => ({
      from: slot.from,
      to: slot.to,
      userId: session.user.id,
    })),
  });

  return NextResponse.json({ message: "Configuration saved successfully" });
}
