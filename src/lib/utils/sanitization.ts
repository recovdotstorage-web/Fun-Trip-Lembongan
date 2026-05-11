/**
 * Basic sanitization utility for user inputs.
 * Prevents basic XSS and injection by stripping HTML tags and trimming whitespace.
 */
export function sanitizeString(input: string): string {
  if (!input) return "";
  
  // Remove HTML tags
  const sanitized = input.replace(/<[^>]*>?/gm, "");
  
  // Trim whitespace
  return sanitized.trim();
}

/**
 * Sanitizes an entire object of strings (e.g., form data)
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj };
  for (const key in result) {
    if (typeof result[key] === "string") {
      result[key] = sanitizeString(result[key]) as any;
    }
  }
  return result;
}
