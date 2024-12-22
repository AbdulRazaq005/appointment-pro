import { Prisma } from "@prisma/client";

type Professional = Prisma.UserGetPayload<{
  include: {
    profession: true;
  };
}>;
export type { Professional };
