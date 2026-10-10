export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/5 bg-white/80">
      {/* Mobile: two lines stacked (flex-col).
          md and up: one line, left text and right text (md:flex-row). */}
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-700 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}