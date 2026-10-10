// Small helpers shared by the sign in and sign up forms.

/** Very simple email check: something@something.something */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * The URL can contain ?redirect=/product/ada, telling us where to send the
 * user after login. But anyone can edit a URL, so we must NOT trust it blindly:
 * /signin?redirect=https://evil-site.com would send users to a fake site
 * (this attack is called an "open redirect").
 * We only accept paths that stay on OUR site: they start with "/" but not "//".
 */
export function getSafeRedirect(value?: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/")) return "/";
  if (value.startsWith("//") || value.startsWith("/\\")) return "/";
  return value;
}

/**
 * Build a link that keeps the redirect target:
 * withRedirect("/signup", "/product/ada") -> "/signup?redirect=%2Fproduct%2Fada"
 * With the default "/" no query string is added.
 */
export function withRedirect(path: string, redirectTo: string): string {
  return redirectTo === "/"
    ? path
    : `${path}?redirect=${encodeURIComponent(redirectTo)}`;
}

/**
 * Better Auth returns English error messages. We turn the error CODE into a
 * Bangla message for the toast. `includes` is used because exact code names
 * can vary slightly between versions.
 */
export function getAuthErrorMessage(
  error?: { code?: string; status?: number } | null
): string {
  const code = error?.code ?? "";

  // Check this BEFORE "INVALID_EMAIL" because it also contains that text
  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || error?.status === 401) {
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
  }
  if (code.includes("ALREADY_EXISTS")) {
    return "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে";
  }
  if (code.includes("PASSWORD_TOO_SHORT")) {
    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
  }
  if (code.includes("INVALID_EMAIL")) {
    return "সঠিক ইমেইল ঠিকানা লিখুন";
  }
  return "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন";
}

// Shared HeroUI Input styling so every field looks the same
export const inputClassNames = {
  label: "font-semibold text-slate-800",
  inputWrapper: "bg-white border-slate-200 group-data-[focus=true]:border-brand",
};