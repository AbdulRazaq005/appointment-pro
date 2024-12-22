import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { Role } from "@prisma/client";
import Link from "next/link";

async function fetchProfessionalDetails(id: string) {
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

export default async function AppointmentDetails({
  professionalId,
}: {
  professionalId?: string;
}) {
  const professional = await fetchProfessionalDetails(professionalId ?? "");

  return (
    <Card className="bg-white bg-opacity-80 backdrop-blur-lg mb-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Book Your Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        {professional ? (
          <div>
            <p className="text-gray-600">
              You are booking an appointment with :
            </p>
            <p className="font-bold text-gray-800">{professional.name}</p>
            <p className="text-gray-600">
              {professional.profession?.specialisation}
              <br />
              {professional.profession?.city}, {professional.profession?.state}
              <br />
              Fee: $ {professional.profession?.fee}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">No professional selected.</p>
            <Link
              href="/professionals"
              className="text-blue-500 hover:underline"
            >
              Choose a professional
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
