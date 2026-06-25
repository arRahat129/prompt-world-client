'use server';

import { redirect } from "next/navigation";
import { getJwtToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const isNextRedirect = (error) => {
    return error && (
        error.message === 'NEXT_REDIRECT' ||
        (error.digest && error.digest.startsWith('NEXT_REDIRECT'))
    );
};

export const authHeader = async () => {
    const token = await getJwtToken();

    console.log("JWT exists:", !!token);

    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};

    console.log(header);

    return header;
}

// export const serverFetch = async (path) => {
//     const res = await fetch(`${baseUrl}${path}`);
//     return res.json();
// }

// export const protectedFetch = async (path) => {
//     const res = await fetch(`${baseUrl}${path}`, {
//         headers: await authHeader()
//     });



//     return handleStatusCode(res);

// }

export const serverFetch = async (path) => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            headers: await authHeader(),
            cache: 'no-store'
        });

        console.log(res);

        return await handleStatusCode(res);
    } catch (error) {
        console.error(`Fetch failure on path [${path}]:`, error);
        throw error;
    }
};

export const serverMutation = async (path, data, method = "POST") => {
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...await authHeader()
            },
            body: JSON.stringify(data)
        });

        return await handleStatusCode(res);
    } catch (error) {
        if (isNextRedirect(error)) throw error;
        throw error;
    }
};

export const handleStatusCode = async (res) => {
    console.log(res.status);
    if (res.status === 401) {
        redirect('/unauthorized');
    }
    if (res.status === 403) {
        redirect('/forbidden');
    }

    return await res.json();
};