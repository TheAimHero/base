import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function middleware(request: NextRequest) {
  // Check if the request is for the `/api` path
  if (request.nextUrl.pathname.startsWith('/api')) {
    await delay(200);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to run only for specific paths
export const config = {
  matcher: ['/api/:path*'], // Matches all routes under /api
};
