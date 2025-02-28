"use server";

import db from "@/db/drizzle";
import { auth } from "@/../auth";
import { users } from "@/db/userSchema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import { passwordResetTokenSchema } from "@/db/passwordResetTokenSchema";
import { mailer } from "@/lib/email";

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
  const resetTokenExpires = new Date(Date.now() + 3600000);

  await db
    .insert(passwordResetTokenSchema)
    .values({
      userId: user.id,
      token: passwordResetToken,
      token_expire: resetTokenExpires,
    })
    .onConflictDoUpdate({
      target: passwordResetTokenSchema.userId,
      set: {
        token: passwordResetToken,
        token_expire: resetTokenExpires,
      },
    });

  const resetLink = `${process.env.SITE_BASE_URL}/update-password?token=${passwordResetToken}`;

  await mailer.sendMail({
    from: "test@resend.dev",
    subject: "Your password reset request",
    to: email,
    html: `Hey, ${email}! Your request to reset your password. Here's your password reset link. This link will expire in 1 hour: <a href=${resetLink} >${resetLink}</a> `,
  });
};
