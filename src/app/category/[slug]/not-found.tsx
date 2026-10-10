import NotFoundView from "@/components/ui/NotFoundView";

// Rendered when category/[slug]/page.tsx calls notFound().
// Filename must be exactly "not-found.tsx".
export default function CategoryNotFound() {
  return (
    <NotFoundView
      emoji="🧺"
      title="ক্যাটাগরিটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
    />
  );
}
