import { ConfigurationForm } from "@/components/configuration-form";
import db from "@/db/db";
import { binaryToWorkingDays } from "@/utils/configurationUtils";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import moment from "moment";

export default async function ProfessionalConfigurationPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/unauthorized");
  }
  const { daysOfWeek, timeSlots } = await getConfiguration(userId);

  return (
    <div className="container mx-auto p-4 pt-8">
      <ConfigurationForm daysOfWeek={daysOfWeek} slots={timeSlots} />
    </div>
  );
}

async function getConfiguration(userId: string) {
  const profession = await db.profession.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!profession) {
    throw new Error("No profession found");
  }

  const timeSlots = await db.slot.findMany({
    where: {
      userId: userId,
      isActive: true,
    },
    select: {
      from: true,
      to: true,
    },
  });

  return {
    daysOfWeek: binaryToWorkingDays(profession.workingDays),
    timeSlots: timeSlots.map((slot) => ({
      from: moment(slot.from).format("HH:mm"),
      to: moment(slot.to).format("HH:mm"),
    })),
  };
}
