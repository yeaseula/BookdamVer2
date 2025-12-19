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

const totalStart = Date.now();

  const { data: {session} } = await supabase.auth.getSession();
  if (!session) return { supabase, session: null, profile: null };

    console.log('🔐 세션 확인 완료:', Date.now() - totalStart, 'ms');


  // const { data: profile, error: profileError } = await supabase
  // .from('profiles')
  // .select('*')
  // .eq('id', session.user.id)
  // .single();

  //if(profileError) throw new Error('프로필 데이터를 불러올 수 없습니다.')


const queriesStart = Date.now();

  const [ profile , reviews, memo, books, log, wish, settings ] = await Promise.all([
    supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single(),
    supabase
    .from('reviews')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false }),
    supabase
    .from('memo')
    .select('*')
    .eq('user_id',session.user.id)
    .order('created_at', { ascending: false }),
    supabase
    .from('books')
    .select('*')
    .eq('user_id', session.user.id)
    .order('updated_at', { ascending: false }),
    supabase
    .from('reading_logs')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false }),
    supabase
    .from('wish')
    .select('*')
    .eq('user_id', session.user.id)
    .order('updated_at', { ascending: false }),
    supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', session.user.id)
    .order('updated_at', { ascending: false })
    .single(),
  ])

  console.log('📊 6개 테이블 병렬 쿼리:', Date.now() - queriesStart, 'ms');
console.log('⏱️ createClient 전체:', Date.now() - totalStart, 'ms');

  return {
    supabase,
    session,
    profile : {
      data: profile.data,
      ok: !profile.error,
      error: profile.error
    },
    reviews : {
      data: reviews.data,
      ok: !reviews.error,
      error: reviews.error
    },
    memo : {
      data: memo.data,
      ok: !memo.error,
      error: memo.error
    },
    books : {
      data: books.data,
      ok: !books.error,
      error: books.error
    },
    log : {
      data: log.data,
      ok: !log.error,
      error: log.error
    },
    wish : {
      data: wish.data,
      ok: !wish.error,
      error: wish.error
    },
    settings : {
      data: settings.data,
      ok: !settings.error,
      error: settings.error
    } }
}