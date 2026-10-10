import NotFoundView from "@/components/ui/NotFoundView";

// Shown when product/[slug]/page.tsx calls notFound()
// (for example /product/unknown while logged in).
export default function ProductNotFound() {
  return (
    <NotFoundView
      emoji="🔎"
      title="পণ্যটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে পণ্যটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
    />
  );
}