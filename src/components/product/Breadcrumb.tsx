import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

// One breadcrumb step. The LAST step has no href (it is the current page).
interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    // aria-label tells screen readers what this navigation is for
    <nav aria-label="breadcrumb" className="text-sm text-slate-600">
      {/* flex-wrap: on a narrow phone a long name wraps instead of overflowing */}
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                // Clickable step
                <Link href={item.href} className="hover:text-brand hover:underline">
                  {item.label}
                </Link>
              ) : (
                // Current page: plain text, marked for screen readers
                <span aria-current="page" className="font-medium text-slate-900">
                  {item.label}
                </span>
              )}

              {/* The "›" separator, shown after every item except the last */}
              {!isLast && <FiChevronRight className="text-slate-400" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}