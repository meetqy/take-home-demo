import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Response
  const response = NextResponse.next();

  // Set default CORS headers
  response.headers.set("Access-Control-Allow-Credentials", "*");
  response.headers.set("Access-Control-Allow-Methods", "*");
  response.headers.set("Access-Control-Allow-Headers", "*");
  response.headers.set("Access-Control-Expose-Headers", "*");

  // Return
  return response;
}
