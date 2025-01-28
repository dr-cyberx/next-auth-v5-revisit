import { text, timestamp, serial } from "drizzle-orm/pg-core";
import { integer, pgTable } from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const passwordResetTokenSchema = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .unique(),
  token: text("token"),
  token_expire: timestamp("token_expire"),
});
