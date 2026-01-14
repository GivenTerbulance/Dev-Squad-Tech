import { headers } from "next/headers";

export async function getAuthUser() {
    const headerList = await headers();
    const userId = headerList.get("x-user-id");
    const email = headerList.get("x-user-email");
    const role = headerList.get("x-user-role");

    if (!userId) {
        return null;
    }

    return {
        id: userId,
        email: email,
        role: role,
    };
}

export async function isAdmin() {
    const user = await getAuthUser();
    return user?.role === "ADMIN";
}
