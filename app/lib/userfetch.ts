import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import createClient from "@/utils/supabase/client";
import { Memo } from "../type/Memo";

interface AuthState {
    session: Session | null;
    user: User | null;
    profile: { username: string; interests: string[] } | null;
    reviews: any;
    memo: any;
    setSession: (session:Session | null)=>void;
    setProfile: (profile: { username: string; interests: string[] } | null) => void
    setReviews: (reviews:any) => void;
    setMemo: (memo:any) => void;
    fetchSession: ()=>Promise<void>
}

export const useAuthStore = create<AuthState>((set)=>({
    session: null,
    user: null,
    profile: null,
    reviews: null,
    memo: null,
    setSession:(session)=>set({session, user: session?.user ?? null}),
    setProfile: (profile) => set({ profile }),
    setReviews: (reviews)=>set({reviews}),
    setMemo: (memo)=>set({memo}),
    fetchSession: async()=>{
        const supabase = createClient()
        const {data: {session}} = await supabase.auth.getSession()
        set({session, user: session?.user ?? null})
    }
}))