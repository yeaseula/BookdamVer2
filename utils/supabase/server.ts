import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Memo } from '@/app/type/Memo'

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

  const { data:reviews, error:reviewError } = await supabase
  .from('reviews')
  .select('*')
  .eq('user_id', session.user.id)
  .order('created_at', { ascending: false })

  if(reviewError) {
    console.log('review data 패치 실패', reviewError)
  }

  const { data:memo, error:memoError } = await supabase
  .from('memo')
  .select('*')
  .eq('user_id', session.user.id)
  .order('created_at', { ascending: false })

  return { supabase, session, profile, reviews, memo }
}