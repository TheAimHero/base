import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * Builds a URL by appending `baseUrl` to the result of `getBaseUrl`, and
 * optionally appends query parameters from `params`.
 *
 * @param baseUrl The relative URL path to append to the base URL.
 * @param params An optional object mapping parameter names to values.
 * @returns The built URL as a string.
 */
export const buildUrl = (baseUrl: string, params?: Record<string, unknown>) => {
  const x = getBaseUrl() + baseUrl;
  const url = new URL(x);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue;
      // @hack: this assumes that `value` is never of type Object
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      url.searchParams.append(key, String(value));
    }
    return url.toString();
  }
  return baseUrl;
};

export const objectFromParams = (url: URL) => {
  const params = Object.fromEntries(url.searchParams.entries());
  // Convert string values into their appropriate types
  const parsedParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value === '' || value === undefined) return acc;
      // Check if the value is a comma-separated list and parse as an array of numbers
      if (value.includes(',')) {
        acc[key] = value
          .split(',')
          .map((item) => (isNaN(Number(item)) ? item : Number(item)));
      } else {
        // Otherwise, try to parse as a number or leave as a string
        acc[key] = isNaN(Number(value)) ? value : Number(value);
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );
  return parsedParams;
};
