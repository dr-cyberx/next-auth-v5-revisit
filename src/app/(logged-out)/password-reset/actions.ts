"use server";

import db from "@/db/drizzle";
import { auth } from "../../../../auth";
import { users } from "@/db/userSchema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

export const passwordResetAction = async ({ email }: { email: string }) => {
  const session = await auth();

  if (!!session?.user?.id) {
    return {
      error: true,
      message: "You are already logged in",
    };
  }

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  const passwordResetToken = randomBytes(32).toString("hex");
  console.log(passwordResetToken);
};
