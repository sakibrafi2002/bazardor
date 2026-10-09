"use client";
import { createAuthClient } from "better-auth/react";

// This object is what React components use:
//   authClient.signIn.email({ email, password })
//   authClient.signUp.email({ name, email, password })
//   authClient.signIn.social({ provider: "google" })
//   authClient.signOut()
//   authClient.useSession()      <- React hook, live session data
//   authClient.updateUser({ name })   <- used in the profile update (C3)
//
// No baseURL needed: it automatically talks to the same site
// it is running on (localhost now, your Vercel URL later).
export const authClient = createAuthClient();