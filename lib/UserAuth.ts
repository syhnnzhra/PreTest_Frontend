"use server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { defaultSession, sessionOptions } from "@/lib/sessionConfig";
import { sleep, SessionData } from "@/lib/sessionConfig";

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
        const session = await getIronSession<SessionData>(
            cookies(),
            sessionOptions
        );
        session.token = data.token;
        session.isLoggedIn = true;

        await session.save();
        await sleep(250);

        redirect("/books");
    }
}
