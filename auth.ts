import db from "@/db/drizzle";
import { users } from "@/db/userSchema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (!user) {
          throw new Error("Incorrect credentials");
        } else {
          const passwordCorrect = await compare(
            credentials.password as string,
            user.password!
          );
          if (!passwordCorrect) {
            throw new Error("Incorrect credentials");
          }
        }

        return {
          id: user.id.toString(), //its expect id as a string so must have to convert it
          email: user.email,
        };
      },
    }),
  ],
});
