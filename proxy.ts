import { NextResponse, type NextRequest } from "next/server";
import {
  MAINTENANCE_MODE,
  PREVIEW_TOKEN,
  PREVIEW_COOKIE,
} from "@/lib/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function proxy(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;

  // Always let Next internals and feeds through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // 1a) ?preview=off → clear bypass cookie and continue
  const previewParam = searchParams.get("preview");
  if (previewParam === "off") {
    const url = request.nextUrl.clone();
    url.searchParams.delete("preview");
    const response = NextResponse.redirect(url);
    response.cookies.delete(PREVIEW_COOKIE);
    return response;
  }

  // 1b) ?preview=<token> → set bypass cookie, strip the param, continue
  if (previewParam && previewParam === PREVIEW_TOKEN) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("preview");
    const response = NextResponse.redirect(url);
    response.cookies.set(PREVIEW_COOKIE, PREVIEW_TOKEN, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return response;
  }

  // 2) Cookie already set → bypass maintenance entirely
  const cookieValue = request.cookies.get(PREVIEW_COOKIE)?.value;
  if (cookieValue === PREVIEW_TOKEN) {
    return NextResponse.next();
  }

  // 3) No bypass — root is the maintenance screen, everything else redirects.
  if (pathname === "/") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|avif)).*)",
  ],
};
