import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user || null;
}

export const getJwtToken = async () => {
    const cookie = (await headers()).get("cookie");

    const res = await fetch(
        `${process.env.BETTER_AUTH_URL}/api/auth/token`,
        {
            headers: {
                cookie: cookie ?? "",
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    console.log("get token", data);

    return data.token;
};


export const requireRole = async (role) => {
    const user = await getUserSession();

    if (!user) {
        redirect('/auth/signin');
    }

    if (user.role !== role) {
        redirect('/unauthorized');
    }

    return user;
}