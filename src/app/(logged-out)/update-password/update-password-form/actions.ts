"use server";

import { eq } from "drizzle-orm";
import { auth } from "../../../../../auth";
import db from "@/db/drizzle";
import { passwordResetTokenSchema } from "@/db/passwordResetTokenSchema";
import { passwordMatch } from "@/validation/passwordMatchSchema";
import { hash } from "bcryptjs";
import { users } from "@/db/userSchema";

export const updatePasswordFormActions = async ({
  token,
  password,
  passwordConfirm,
}: {
  token: string;
  password: string;
  passwordConfirm: string;
}) => {
  const passwordValidation = passwordMatch.safeParse({
    password,
    passwordConfirm,
  });

  if (!passwordValidation.success) {
    return {
      error: true,
      message:
        passwordValidation?.error?.issues[0]?.message ?? "An error occurred",
    };
  }

  const session = await auth();

  if (session?.user?.id) {
    return {
      error: true,
      message: "You are already logged in",
    };
  }

  let tokenIsValid = false;

  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokenSchema)
      .where(eq(passwordResetTokenSchema.token, token));

    const now = Date.now();

    if (
      !!passwordResetToken?.token_expire &&
      passwordResetToken?.token_expire.getTime() > now
    ) {
      tokenIsValid = true;
    }

    if (!tokenIsValid) {
      return {
        error: true,
        message: "Token is invalid or has expired",
        tokenInValid: true,
      };
    }

    const hashedPassword = await hash(password, 10);
    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, passwordResetToken.userId!));

    await db
      .delete(passwordResetTokenSchema)
      .where(eq(passwordResetTokenSchema.id, passwordResetToken.id));
  }
};
