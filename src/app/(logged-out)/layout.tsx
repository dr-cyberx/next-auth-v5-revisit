import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function LoggedOutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!!session?.user?.id) {
        redirect('/my-account')
    }
    return <div>{children}</div>;
}
