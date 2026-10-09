import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * Get the logged-in user's session in a SERVER component.
 * Returns null if nobody is logged in.
 * `headers()` contains the browser's cookies, which hold the session token.
 */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Use this at the top of a protected page.
 * If there is no valid session, send the user to /signin and remember
 * where they wanted to go, so we can bring them back after login.
 *
 * Example: await requireSession("/product/ada")
 */
export async function requireSession(returnTo: string) {
  const session = await getSession();

  if (!session) {
    redirect(
      `/signin?redirect=${encodeURIComponent(returnTo)}&reason=login-required`
    );
  }
  return session; // here we know session is NOT null
}