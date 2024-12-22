import { PrismaClient } from "@prisma/client";
import USERS from "./seedData/users";
const db = new PrismaClient();

async function main() {
  // cleanup data
  await db.user.deleteMany({});
  await db.profession.deleteMany({});
  await db.slot.deleteMany({});

  // USERS
  try {
    USERS.forEach(async (user) => {
      await db.user.create({
        data: {
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
    });
  } catch (error) {
    console.error(`SLOTS Seed Error: ${error}`);
  }

  // SLOTS
  try {
    await db.slot.createMany({
      data: [
        {
          id: "0ab04570-ec0b-4b23-a586-9b47ba1e53e8",
          from: new Date(Date.UTC(2000, 0, 1, 10, 0, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 10, 20, 0)),
        },
        {
          id: "08e26b59-e07a-487a-8d0c-fe398272b20b",
          from: new Date(Date.UTC(2000, 0, 1, 10, 20, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 10, 40, 0)),
        },
        {
          id: "b9d9dc57-d239-4d1e-bc87-2e8118d3485f",
          from: new Date(Date.UTC(2000, 0, 1, 10, 40, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 11, 0, 0)),
        },
        {
          id: "341ebde8-c55b-4532-add8-21505c46c2a7",
          from: new Date(Date.UTC(2000, 0, 1, 11, 0, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 11, 20, 0)),
        },
        {
          id: "08559b17-51e2-4dd0-8cf7-ac893c40b6b2",
          from: new Date(Date.UTC(2000, 0, 1, 11, 20, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 11, 40, 0)),
        },
        {
          id: "bd6ac5d4-c3e5-493c-b74c-4e3346fbbfa7",
          from: new Date(Date.UTC(2000, 0, 1, 11, 40, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 12, 0, 0)),
        },
      ],
    });
  } catch (error) {
    console.error(`SLOTS Seed Error: ${error}`);
  }
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
