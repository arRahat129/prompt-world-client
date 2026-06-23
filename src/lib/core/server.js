'use server';

import { redirect } from "next/navigation";
import { getJwtToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
    const token = await getJwtToken();

    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};

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
    const res = await fetch(`${baseUrl}${path}`, {
        headers: await authHeader()
    });



    return handleStatusCode(res);

}

export const serverMutation = async (path, data, method = "POST") => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Backend Mutation Error (${res.status}):`, errorText);
        throw new Error(`Server returned status ${res.status}`);
    }

    console.log(res.status);

    return handleStatusCode(res);
}

export const handleStatusCode = async res => {
    if (res.status === 401) {
        redirect('/unauthorized');
    }
    else if (res.status === 403) {
        redirect('/forbidden');
    }

    return res.json();
}