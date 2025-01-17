/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { passwordMatch } from "@/validation/passwordMatchSchema";
import { z } from "zod";
import { hash } from "bcryptjs";
import db from "@/db/drizzle";
import { users } from "@/db/userSchema";

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  try {
    const newUserSchema = z
      .object({
        email: z.string().email(),
      })
      .and(passwordMatch);

    const newUserValidation = newUserSchema.safeParse({
      email,
      password,
      passwordConfirm,
    });

    if (!newUserValidation.success) {
      return {
        error: true,
        message:
          newUserValidation.error.issues[0].message ?? "An error occurred",
      };
    }

    const hashPassword = await hash(password, 10);

    await db.insert(users).values({
      email,
      password: hashPassword,
    });
  } catch (e: any) {
    if (e.code === "23505") {
      return {
        error: true,
        message: "Email already exists",
      };
    }
    return {
      error: true,
      message: "An error occurred",
    };
  }
};
