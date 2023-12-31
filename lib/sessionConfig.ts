import { SessionOptions } from "iron-session";

export interface SessionData {
    token: string;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    token: "",
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password:
        process.env.COOKIES_PASSWORD || "cedac7b9-43c1-4da7-810e-abd648789f53s",
    cookieName: "user-session-token",
    cookieOptions: {
        // secure only works in `https` environments
        // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
        secure: true,
    },
};

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
