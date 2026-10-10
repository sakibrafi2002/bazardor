import NotFoundView from "@/components/ui/NotFoundView";

// Next.js shows this file for ANY URL that matches no route, for example
// /abc, /category/chal/extra or /profile/xyz.
// The filename must be exactly "not-found.tsx" and live in the app folder root.
// The navbar, ticker and footer still appear around it, because this page
// is rendered inside the root layout.
export default function GlobalNotFound() {
  return (
    <NotFoundView
      emoji="🧭"
      title="৪০৪ — পেজটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে পেজটি খুঁজছেন সেটি নেই, সরিয়ে ফেলা হয়েছে বা লিংকটি ভুল।"
    />
  );
}