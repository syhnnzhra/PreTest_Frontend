"use server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";

interface loginInteface {
    email: string;
    password: string;
}

export async function userLogin(loginInteface: loginInteface) {
    const bodyValue = {
        email: loginInteface.email,
        password: loginInteface.password,
    };
    const res = await fetch(`${process.env.SERVER_PUBIC_URL}/api/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyValue),
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    const data = await res.json();

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        return data.message;
    } else {
        const session = await getIronSession(cookies(), {
            password:
                process.env.COOKIES_PASSWORD ||
                "cedac7b9-43c1-4da7-810e-abd648789f53s",
            cookieName: "user-session-token",
        });
        session.token = data.token;
        await session.save();

        redirect("/books");
    }
}
