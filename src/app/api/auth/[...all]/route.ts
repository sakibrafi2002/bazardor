import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// [...all] is a "catch-all" route: it matches /api/auth/sign-in/email,
// /api/auth/sign-up/email, /api/auth/get-session, /api/auth/callback/google, etc.
// Better Auth decides what to do based on the rest of the URL.
export const { GET, POST } = toNextJsHandler(auth);