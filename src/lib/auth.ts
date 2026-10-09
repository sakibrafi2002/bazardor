import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "./mongodb";

// Social providers are added ONLY if their keys exist in .env.
// This lets the app run fine before you have created the Google/GitHub apps.
const googleEnabled =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;
const githubEnabled =
  !!process.env.GITHUB_CLIENT_ID && !!process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  // Where users, sessions and accounts are stored.
  // Passing `client` enables database transactions (Atlas supports them),
  // so a user and their account are created together or not at all.
  database: mongodbAdapter(db, { client }),

  // Email + password login
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8, 

    // By default Better Auth logs the user in right after sign up.
    // The assignment says: after register -> go to the LOGIN page,
    // so we turn the automatic login off.
    autoSignIn: false,
  },

  // Google + GitHub login (only if keys are provided, see above)
  socialProviders: {
    ...(googleEnabled && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    }),
    ...(githubEnabled && {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
    }),
  },

  // Lets Better Auth set cookies from Next.js server code.
  // IMPORTANT: this plugin must always be the LAST item in the array.
  plugins: [nextCookies()],
});