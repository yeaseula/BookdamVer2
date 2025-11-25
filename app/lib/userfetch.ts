import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import createClient from "@/utils/supabase/client";

interface BaseType {
    id:string;
    created_at: string;
}

export interface Profiles extends BaseType {
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
    setSession: (session: Session | null) => void;
    setProfile: (profile: { username: string; interests: string[] } | null) => void;
    setData: <T extends { id: string }>(key: 'memo' | 'reviews', items: T[]) => void;
    addData: <T extends { id: string }>(key: 'memo' | 'reviews', item: T) => void;
    updateData: <T extends { id: string }>(key: 'memo' | 'reviews', item: T) => void;
    removeData: (key: 'memo' | 'reviews', id: string) => void;
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
    fetchSession: async()=>{
        const supabase = createClient()
        const {data: {session}} = await supabase.auth.getSession()
        set({session, user: session?.user ?? null})
    },
    setData: (key, items) => set({ [key]: items } as any),
    addData: (key, item) => set({ [key]: [item, ...get()[key]] } as any),
    updateData: (key, item) => set({ [key]: get()[key].map((i: any) => i.id === item.id ? item : i) } as any),
    removeData: (key, id) => set({ [key]: get()[key].filter((i: any) => i.id !== id) } as any),

}))