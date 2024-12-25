import { PrismaClient } from "@prisma/client";
import USERS from "./seedData/users";
const db = new PrismaClient();

async function main() {
  // cleanup data
  await db.profession.deleteMany({});
  await db.user.deleteMany({});
  await db.slot.deleteMany({});

  // USERS
  const userIds: string[] = [];
  try {
    USERS.forEach(async (user) => {
      await db.user.create({
        data: {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
          passwordHash: user.passwordHash,
          profession: {
            create: {
              specialisation: user.profession.specialisation,
              city: user.profession.city,
              state: user.profession.state,
              fee: user.profession.fee || 0,
              licenseNumber: user.profession.licenseNumber,
              phoneNo: user.profession.phoneNo,
            },
          },
        },
      });
      userIds.push(user.id);
      await seedDefaultSlots(user.id);
    });
  } catch (error) {
    console.error(`SLOTS Seed Error: ${error}`);
  }
}

export async function seedDefaultSlots(userId: string) {
  try {
    await db.slot.createMany({
      data: [
        {
          from: new Date(Date.UTC(2000, 0, 1, 4, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 5, 30, 0)),
          userId,
        },
        {
          from: new Date(Date.UTC(2000, 0, 1, 5, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 6, 30, 0)),
          userId,
        },
        {
          from: new Date(Date.UTC(2000, 0, 1, 6, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 7, 30, 0)),
          userId,
        },
        {
          from: new Date(Date.UTC(2000, 0, 1, 8, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 9, 30, 0)),
          userId,
        },
        {
          from: new Date(Date.UTC(2000, 0, 1, 9, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 10, 30, 0)),
          userId,
        },
        {
          from: new Date(Date.UTC(2000, 0, 1, 10, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 11, 30, 0)),
          userId,
        },
      ],
    });
  } catch (error) {
    console.error(`SLOTS Seed Error: ${error}`);
    return false;
  }

  return true;
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(`Db Seed Error: ${e}`);
    await db.$disconnect();
    process.exit(1);
  });
