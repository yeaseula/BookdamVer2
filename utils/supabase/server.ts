import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function createClient() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  const { data: {session} } = await supabase.auth.getSession();
  if (!session) return { supabase, session: null, profile: null };

  const { data: profile } = await supabase
  .from('profiles')
  .select('username, interests')
  .eq('id', session.user.id)
  .single();

  return { supabase, session, profile }
}