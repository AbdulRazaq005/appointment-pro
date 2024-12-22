import ProfessionalList from "@/components/professional-list";
import db from "@/db/db";
import { Professional } from "@/types/userTypes";
import { Role } from "@prisma/client";

async function fetchProfessionals(): Promise<Professional[]> {
  const res = await db.user.findMany({
    where: {
      role: Role.PROFESSIONAL,
    },
    include: {
      profession: true,
    },
  });
  return res;
}

export default async function ProfessionalsPage() {
  const professionals = await fetchProfessionals();
  return (
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Choose a Professional
      </h1>
      <ProfessionalList professionals={professionals} />
    </div>
  );
}
