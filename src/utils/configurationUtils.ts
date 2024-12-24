import db from "@/db/db";

export const workingDaysToBinary = (days: number[]) => {
  let binaryString = "";
  for (let i = 0; i < 7; i++) {
    binaryString += days.includes(i) ? "1" : "0";
  }
  return binaryString;
};

export const binaryToWorkingDays = (binary: string | undefined) => {
  const days: number[] = [];
  if (!binary) {
    return days;
  }

  for (let i = 0; i < 7; i++) {
    if (binary[i] === "1") {
      days.push(i);
    }
  }
  return days;
};

export const getDisabledDays = (workingDays: number[]) => {
  const disabledDays: number[] = [];
  [0, 1, 2, 3, 4, 5, 6].forEach((day) => {
    if (!workingDays.includes(day)) {
      disabledDays.push(day);
    }
  });

  return disabledDays;
};

export async function seedDefaultSlots(userId: string) {
  try {
    await db.slot.createMany({
      data: [
        {
          id: "0ab04570-ec0b-4b23-a586-9b47ba1e53e8",
          from: new Date(Date.UTC(2000, 0, 1, 4, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 5, 30, 0)),
          userId,
        },
        {
          id: "08e26b59-e07a-487a-8d0c-fe398272b20b",
          from: new Date(Date.UTC(2000, 0, 1, 5, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 60, 30, 0)),
          userId,
        },
        {
          id: "b9d9dc57-d239-4d1e-bc87-2e8118d3485f",
          from: new Date(Date.UTC(2000, 0, 1, 6, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 7, 30, 0)),
          userId,
        },
        {
          id: "341ebde8-c55b-4532-add8-21505c46c2a7",
          from: new Date(Date.UTC(2000, 0, 1, 8, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 9, 80, 0)),
          userId,
        },
        {
          id: "08559b17-51e2-4dd0-8cf7-ac893c40b6b2",
          from: new Date(Date.UTC(2000, 0, 1, 9, 30, 0)),
          to: new Date(Date.UTC(2000, 0, 1, 10, 30, 0)),
          userId,
        },
        {
          id: "bd6ac5d4-c3e5-493c-b74c-4e3346fbbfa7",
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
