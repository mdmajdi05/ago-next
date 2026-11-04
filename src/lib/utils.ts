import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and resolves conflicting Tailwind utility classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Converts text into an SEO-friendly URL slug.
 * Handles spaces, special characters, uppercase letters, and duplicate hyphens.
 */
export function slugify(text: string): string {
  if (!text) return "";

  return text
    .toString()
    .normalize("NFKD") // normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid characters
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text
}

/**
 * Formats a phone number for human-readable display.
 * Example input: "+917011123269" or "7011123269" -> output: "+91 7011123269"
 */
export function formatPhone(phone: string): string {
  if (!phone) return "";

  const digits = phone.replace(/\D/g, "");

  // Indian numbers (12 digits with country code 91, or 10 digits without)
  if (digits.startsWith("91") && digits.length === 12) {
    const subscriber = digits.slice(2);
    return `+91 ${subscriber.slice(0, 5)} ${subscriber.slice(5)}`;
  }

  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }

  // Fallback to spaced international format if prefixed by +
  if (phone.startsWith("+")) {
    return phone;
  }

  return `+${digits}`;
}

/**
 * Sanitizes a phone number to digits only with leading country code for tel: and wa.me links.
 */
export function cleanPhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
}

/**
 * Generates an absolute URL given a relative path.
 */
export function absoluteUrl(path = ""): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agoaviation.com";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Truncates text cleanly at word boundaries with an ellipsis.
 */
export function truncate(text: string, length = 160): string {
  if (!text || text.length <= length) return text;
  return `${text.slice(0, length).trim()}...`;
}
