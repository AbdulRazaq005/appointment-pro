import { User as DbUser } from "./../../../../../node_modules/.prisma/client/index.d";
import db from "@/db/db";
import type { Session, SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import type { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import bcrypt from "bcrypt";

const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET ?? "some random secret",
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic to verify credentials here
        if (!credentials) return null;
        const { email, password } = credentials;
        const user = await db.user.findUnique({
          where: {
            email: email,
          },
        });
        if (
          user &&
          user.passwordHash &&
          bcrypt.compareSync(password, user.passwordHash)
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user: User | DbUser | AdapterUser;
    }) {
      let data;
      if (user) {
        data = JSON.parse(JSON.stringify({ user: user }));
        delete data.user.passwordHash;
        delete data.user.createdAt;
        delete data.user.updatedAt;
        delete data.user.emailVerified;
      }
      console.log("Jwt user: ", data);
      // console.log("Jwt data: ", data);
      return { ...token, ...data };
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const user = token.user as DbUser | null;
      const data = JSON.parse(JSON.stringify({ user: user }));
      // console.log("Session data: ", data);
      return { ...session, ...data };
    },
  },
};
export default authOptions;
