import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import createClient from "@/utils/supabase/client";

interface BaseType {
    id:string;
    created_at: string;
}

interface Profiles extends BaseType {
    username: string;
    interests: string[];
}

export interface Memo extends BaseType {
    user_id: string;
    title: string;
    page: number;
    content: string;
    updated_at: string;
}

export interface Reviews extends BaseType {
    user_id: string;
    category: string;
    title: string;
    author: string;
    start_date: string;
    end_date: string;
    memo: string;
    content: string;
    rating: number;
    updated_at: string;
}

interface AuthState {
    session: Session | null;
    user: User | null;
    profile: { username: string; interests: string[] } | null;
    reviews: Reviews[];
    memo: Memo[];
    setSession: (session:Session | null)=>void;
    setProfile: (profile: { username: string; interests: string[] } | null) => void
    setReviews: (reviews: Reviews[]) => void;
    setMemo: (memo: Memo[]) => void;
    fetchSession: ()=>Promise<void>
}

export const useAuthStore = create<AuthState>((set,get)=>({
    session: null,
    user: null,
    profile: null,
    reviews: [],
    memo: [],
    setSession:(session)=>set({session, user: session?.user ?? null}),
    setProfile: (profile) => set({ profile }),
    setReviews: (reviews)=>set({reviews}),
    setMemo: (memo)=>set({memo}),
    fetchSession: async()=>{
        const supabase = createClient()
        const {data: {session}} = await supabase.auth.getSession()
        set({session, user: session?.user ?? null})
    },

    addReview: (review: Reviews) =>
        set({ reviews: [...get().reviews, review] }),

    updateReview: (updated: Reviews) =>
        set({
            reviews: get().reviews.map(r => r.id === updated.id ? updated : r)
        }),

    removeReview: (id: string) =>
        set({ reviews: get().reviews.filter(r => r.id !== id) }),

    addMemo: (memo: Memo) =>
        set({ memo: [...get().memo, memo] }),

    updateMemo: (updated: Memo) =>
        set({
            memo: get().memo.map(m => m.id === updated.id ? updated : m)
        }),

    removeMemo: (id: string) =>
        set({ memo: get().memo.filter(m => m.id !== id) }),

}))