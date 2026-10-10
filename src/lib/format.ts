import type { PriceChange, Unit } from "@/types";

/* ------------------------------------------------------------------ */
/* 1. Bengali digits                                                    */
/* ------------------------------------------------------------------ */

// Index 0 -> '০', index 1 -> '১', ... index 9 -> '৯'
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/**
 * Replace every English digit in a string with a Bengali digit.
 * toBengaliDigits("1,850") -> "১,৮৫০"
 *
 * We do this by hand (instead of toLocaleString("bn-BD")) so the output is
 * identical on the server and in the browser. Different ICU data between the
 * two can cause React "hydration mismatch" errors.
 */
export function toBengaliDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/**
 * The reverse: turn a Bengali-digit string into a real number.
 * parseBengaliNumber("১,৮৫০") -> 1850
 *
 * This is what the challenge means by "sort by numeric value, not string".
 * Our API already gives numbers, so we rarely need it, but it is here to
 * prove the logic is safe if a price ever arrives as Bengali text.
 */
export function parseBengaliNumber(input: string): number {
  const english = input
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d))) // Bengali -> English digits
    .replace(/,/g, ""); // remove thousand separators
  return Number(english);
}

/* ------------------------------------------------------------------ */
/* 2. Numbers and prices                                                */
/* ------------------------------------------------------------------ */

/**
 * Format a number with thousand separators and Bengali digits.
 * formatNumber(1850) -> "১,৮৫০"
 * formatNumber(63.5, 2) -> "৬৩.৫০"
 */
export function formatNumber(value: number, decimals = 0): string {
  // "en-US" always gives "1,850.00" style output, which we then convert.
  const english = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return toBengaliDigits(english);
}

/**
 * Price with the currency word: formatPrice(148) -> "১৪৮ টাকা"
 * If the value has a fraction (like an average of 63.5) we show 2 decimals
 * to match the Figma ("৬৩.৫০ টাকা"), otherwise none ("৬২ টাকা").
 */
export function formatPrice(value: number): string {
  const decimals = Number.isInteger(value) ? 0 : 2;
  return `${formatNumber(value, decimals)} টাকা`;
}

/* ------------------------------------------------------------------ */
/* 3. Units                                                             */
/* ------------------------------------------------------------------ */

// English API unit -> Bangla word
const UNIT_BN: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

/** getUnitLabel("kg") -> "কেজি" (used in the ticker: "৬৬ টাকা/কেজি") */
export function getUnitLabel(unit: Unit): string {
  return UNIT_BN[unit] ?? unit;
}

/** getPerUnitLabel("kg") -> "প্রতি কেজি" (used on product cards) */
export function getPerUnitLabel(unit: Unit): string {
  return `প্রতি ${getUnitLabel(unit)}`;
}

/* ------------------------------------------------------------------ */
/* 4. Price change badge                                                */
/* ------------------------------------------------------------------ */

/**
 * Text for the badge: "▲ ২.১%", "▼ ২.৯%", "— ০.০%"
 * Math.abs removes the minus sign, because the arrow already shows direction.
 */
export function formatChange(change: PriceChange): string {
  const pct = toBengaliDigits(Math.abs(change.pct).toFixed(1)); // always 1 decimal
  if (change.dir === "up") return `▲ ${pct}%`;
  if (change.dir === "down") return `▼ ${pct}%`;
  return `— ${pct}%`;
}

/**
 * Tailwind classes for each direction (colors follow the preview):
 *  up = RED, down = GREEN, flat = GRAY.
 * These class names come from the --color-* tokens in globals.css.
 */
export const CHANGE_STYLES = {
  up: { text: "text-up", bg: "bg-up-soft" },
  down: { text: "text-down", bg: "bg-down-soft" },
  flat: { text: "text-flat", bg: "bg-flat-soft" },
} as const;

/* ------------------------------------------------------------------ */
/* 5. Bangla date for the navbar ("মঙ্গলবার, ৬ অক্টোবর, ২০২৬")       */
/* ------------------------------------------------------------------ */

const WEEKDAYS_BN = [
  "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার",
];

const MONTHS_BN = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

/** Returns today's date in Bangla, using Bangladesh time (Asia/Dhaka). */
export function getBanglaDate(date: Date = new Date()): string {
  // Convert "now" into Dhaka time so the date is right wherever the server runs
  const dhaka = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  const weekday = WEEKDAYS_BN[dhaka.getDay()];
  const day = toBengaliDigits(dhaka.getDate());
  const month = MONTHS_BN[dhaka.getMonth()];
  const year = toBengaliDigits(dhaka.getFullYear());
  return `${weekday}, ${day} ${month}, ${year}`;
}

/** A date without the weekday: "৬ অক্টোবর, ২০২৬". Used for "member since". */
export function formatBanglaDateOnly(date: Date): string {
  // Same Dhaka-time conversion as getBanglaDate
  const dhaka = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  const day = toBengaliDigits(dhaka.getDate());
  const month = MONTHS_BN[dhaka.getMonth()];
  const year = toBengaliDigits(dhaka.getFullYear());
  return `${day} ${month}, ${year}`;
}