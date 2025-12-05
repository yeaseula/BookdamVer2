
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import createClient from "@/utils/supabase/client";
import { persist } from "zustand/middleware"

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

export interface Books extends BaseType {
    user_id: string;
    title: string;
    total_pages: number;
    current_page: number;
    updated_at: string;
}

export interface Log extends BaseType {
    book_id: string;
    user_id: string;
    current_page: number;
    duration_minutes: number;
}

export interface Wish extends BaseType {
    user_id: string;
    title: string;
    author: string;
    price: number;
    updated_at: string;
}

interface AuthState {
    session: Session | null;
    user: User | null;
    profile: { username: string; interests: string[] } | null;
    reviews: Reviews[];
    memo: Memo[];
    books: Books[];
    log: Log[];
    wish: Wish[];

    timer: number;
    timeObj: Books | null;
    isTimer: boolean;
    isMinimalize: boolean;

    isReviewLoaded: boolean;
    isMemoRoaded: boolean;
    isBooksLoaded: boolean;
    isLogLoaded: boolean;
    isWishLoaded: boolean;
    setSession: (session: Session | null) => void;
    setProfile: (profile: { username: string; interests: string[] } | null) => void;
    setData: <T extends { id: string }>(key: 'memo' | 'reviews' | 'books' | 'log' | 'wish', items: T[]) => void;
    addData: <T extends { id: string }>(key: 'memo' | 'reviews' | 'books' | 'log' | 'wish', item: T) => void;
    updateData: <T extends { id: string }>(key: 'memo' | 'reviews' | 'books' | 'log' | 'wish', item: T) => void;
    removeData: (key: 'memo' | 'reviews' | 'books' | 'log' | 'wish', id: string) => void;
    fetchSession: ()=>Promise<void>;
    setTimerObj: (key: 'timer' | 'timeObj' | 'isTimer' | 'isMinimalize', item: any)=> void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set,get) => ({
            session: null,
            user: null,
            profile: null,
            reviews: [],
            memo: [],
            books: [],
            log: [],
            wish: [],
            timer: 0,
            timeObj: null,
            isTimer: false,
            isMinimalize: false,
            isReviewLoaded: false,
            isMemoRoaded: false,
            isBooksLoaded: false,
            isLogLoaded: false,
            isWishLoaded: false,
            setSession:(session)=>set({session, user: session?.user ?? null}),
            setProfile: (profile) => set({ profile }),
            fetchSession: async()=>{
                const supabase = createClient()
                const {data: {session}} = await supabase.auth.getSession()
                set({session, user: session?.user ?? null})
            },
            setData: (key, items) => {
                if(key === 'reviews') {
                    set({ [key]: items, isReviewLoaded: true } as any)
                } else if(key === 'memo') {
                    set({ [key]: items, isMemoRoaded: true } as any)
                } else if(key === 'books') {
                    set({ [key]: items, isBooksLoaded: true} as any)
                } else if(key === 'log') {
                    set({ [key]: items, isLogLoaded: true} as any)
                } else if(key === 'wish') {
                    set({ [key]: items, isWishLoaded: true} as any)
                }
            },
            addData: (key, item) => set({ [key]: [item, ...get()[key]] } as any),
            updateData: (key, item) => {
                const updated = get()[key].map((i: any) => i.id === item.id ? item : i)
                //books는 updated_at 기준
                if(key === 'books') {
                    updated.sort((a:any,b:any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                }
                if(key === 'reviews') {
                    updated.sort((a:any,b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                }
                if(key === 'memo') {
                    updated.sort((a:any,b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                }
                if(key === 'log') {
                    updated.sort((a:any,b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                }
                if(key === 'wish') {
                    updated.sort((a:any,b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                }
                set({ [key]: updated } as any)
            },

            removeData: (key, id) => set({ [key]: get()[key].filter((i: any) => i.id !== id) } as any),
            setTimerObj: (key,item) => set({ [key] : item })
        }),
        {
        name: "auth-store",    // localStorage key
        partialize: (state) => ({
            timer: state.timer,
            timeObj: state.timeObj,
            isTimer: state.isTimer,
            isMinimalize: state.isMinimalize,
        })
        }
    )
)

export interface SettingDefault {
    reviewSet: 'list' | 'gallery',
    calendarStart: 'sun' | 'mon',
    calendarStamp: 'star' | 'gook',
    font: 'normal' | 'gsans',
    timerSet: 'normal' | 'bottom'
}

export interface UserSetting {
    userSetting: SettingDefault
    initSettings: (settings: any) => void
    setUserCustom: <K extends keyof SettingDefault>(
        key: K,
        value: SettingDefault[K]
    )=>void
}

export const useSettingStore = create<UserSetting>((set) => ({
    userSetting: {
        reviewSet: 'list',
        calendarStart: 'sun',
        calendarStamp: 'star',
        font: 'normal',
        timerSet: 'normal',
    },
    initSettings: (settings) => {
        if(!settings) return

        const newSettings = {
            reviewSet: settings[0].review_set || 'list',
            calendarStart: settings[0].calendar_start || 'sun',
            calendarStamp: settings[0].calendar_stamp || 'star',
            font: settings[0].font || 'normal',
            timerSet: settings[0].timer_set || 'normal',
        }
        set({ userSetting: newSettings })
    },
    setUserCustom: (key, value) =>
        set((state) => ({
            userSetting: {
                ...state.userSetting,
                [key]: value
            }
        }))
}))