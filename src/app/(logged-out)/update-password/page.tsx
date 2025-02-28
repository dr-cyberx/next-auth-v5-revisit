import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/drizzle";
import { passwordResetTokenSchema } from "@/db/passwordResetTokenSchema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import UpdatePasswordForm from "./update-password-form";

export default async function UpdatePassword({
    searchParams
}: { searchParams: Promise<{ token?: string }> }) {
    let tokenIsValid = false;

    const searchParamVal = await searchParams;
    const { token } = searchParamVal;

    if (token) {
        const [passwordResetToken] = await db.select().from(passwordResetTokenSchema).where(eq(passwordResetTokenSchema.token, token));

        const now = Date.now();

        if (!!passwordResetToken?.token_expire && passwordResetToken?.token_expire.getTime() > now) {
            tokenIsValid = true;
        }
    }

    return (
        <main className="flex justify-center items-center min-h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>{tokenIsValid ? "Update password" : "Your password reset link is invalid or has expired"}</CardTitle>
                </CardHeader>
                <CardContent>
                    {tokenIsValid ? (
                        <UpdatePasswordForm token={token ?? ''} />
                    ) : (
                        <Link href={"/password-reset"}>Request another password reset link</Link>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}