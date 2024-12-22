import db from "@/db/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(
  req: NextRequest,
  { params: params }: { params: { professionalId: string | undefined } }
) {
  const { professionalId } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user || !professionalId) {
    return NextResponse.json(
      { error: "Invalid Professional Id", data: null },
      { status: 200 }
    );
  }
  const appointments = await db.appointment.findMany({
    where: { professionalId: professionalId, userId: session.user.id },

    select: {
      id: true,
      date: true,
      slotId: true,
      slot: true,
      name: true,
      email: true,
      professionalId: true,
    },
  });

  return NextResponse.json({ data: appointments });
}
