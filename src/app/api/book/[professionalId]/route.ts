import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { bookAppointment } from "@/services/appointmentService";
import { CreateAppointmentDto } from "@/types/appointmentTypes";

export async function POST(
  req: NextRequest,
  { params: params }: { params: { professionalId: string | undefined } }
) {
  const { professionalId } = await params;
  const data: CreateAppointmentDto = await req.json();

  const session = await getServerSession(authOptions);
  if (!session?.user || !professionalId) {
    return NextResponse.json(
      { error: "Invalid Professional Id", data: null },
      { status: 200 }
    );
  }
  const result = await bookAppointment(data);

  return NextResponse.json(result);
}
