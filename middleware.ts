import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function MUST be named "middleware" and exported
export function middleware(request: NextRequest) {
  
  // 1. Get the current path
  const path = request.nextUrl.pathname

  // 2. Define protected routes (Dashboard)
  const isProtectedRoute = path.startsWith('/dashboard')
  
  // 3. Define public routes (Login)
  const isPublicRoute = path === '/login'

  // 4. Check for the session cookie
  const cookie = request.cookies.get('nexus_session')
  const hasSession = !!cookie

  // CASE A: User tries to access Dashboard without a session -> Redirect to Login
  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // CASE B: User tries to access Login while already logged in -> Redirect to Dashboard
  if (isPublicRoute && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// 5. Configure the matcher to run only on specific paths
export const config = {
  matcher: [
    '/dashboard/:path*', // Run on all dashboard routes
    '/login',            // Run on login route
  ],
}