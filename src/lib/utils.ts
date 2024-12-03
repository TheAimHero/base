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
export const buildUrl = (
  baseUrl: string,
  params?: Record<string, string | number | boolean>,
) => {
  const x = getBaseUrl() + baseUrl;
  console.log(x);
  const url = new URL(x);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, String(value));
    }
  }
  return baseUrl;
};

export const objectFromParams = (url: URL) => {
  return Object.fromEntries(url.searchParams);
};
