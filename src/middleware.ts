import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/api"];

const isPublic = (pathname: string) =>
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

/**
 * Route gate — redirects unauthenticated users to /login. Auth is the
 * HttpOnly `token` cookie set by the backend after `/users/verify-with-otp`.
 */
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (isPublic(pathname)) return NextResponse.next();

    const hasSession = req.cookies.has("m_at");
    if (!hasSession) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match everything except Next.js internals and static assets.
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)).*)",
    ],
};
