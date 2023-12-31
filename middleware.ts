import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/sessionConfig";
import { sleep, SessionData } from "@/lib/sessionConfig";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = getIronSession<SessionData>(cookies(), sessionOptions);

    // console.log((await session).token);
    if ((await session).isLoggedIn !== true) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/books/:path*",
};
