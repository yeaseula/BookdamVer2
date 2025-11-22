import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import createClient from "@/utils/supabase/client";

interface AuthState {
    session: Session | null;
    user: User | null;
    profile: { username: string; interests: string[] } | null;
    reviews: any;
    setSession: (session:Session | null)=>void;
    setProfile: (profile: { username: string; interests: string[] } | null) => void
    setReviews: (reviews:any) => void;
    fetchSession: ()=>Promise<void>
}

export const useAuthStore = create<AuthState>((set)=>({
    session: null,
    user: null,
    profile: null,
    reviews: null,
    setSession:(session)=>set({session, user: session?.user ?? null}),
    setProfile: (profile) => set({ profile }),
    setReviews: (reviews)=>set({reviews}),
    fetchSession: async()=>{
        const supabase = createClient()
        const {data: {session}} = await supabase.auth.getSession()
        set({session, user: session?.user ?? null})
    }
}))