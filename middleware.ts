// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'



export async function middleware(request: NextRequest) {

console.log('✅ MIDDLEWARE PATH:', request.nextUrl.pathname)

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value }) => supabaseResponse.cookies.set(name, value))
        },
      },
    }
  )

  // IMPORTANT: Don't remove getClaims()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  if (
    user &&
    (request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/guardLogin'
    return NextResponse.redirect(url)
  }

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/signup') &&
    !request.nextUrl.pathname.startsWith('/guardNeedLogin')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/guardNeedLogin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|api|auth|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)).*)',
  ],
}


// export function middleware(req) {
//   const token = req.cookies.get('sb-access-token')?.value;

//   if (!token) return NextResponse.redirect(new URL('/login', req.url));
//   return NextResponse.next();

// }

//export const config = { matcher: ['/dashboard/:path*'] };
