import createClient from "@/utils/supabase/client";
import { DataState, Profiles, Reviews, Memo, Books, Log, Wish, SettingDefault } from "./userfetch";

const supabase = createClient()

//profile
export const UserInfoInitial = async (userId:string)=>{
    const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

    const userInfor:DataState<Profiles> = {
        data: data,
        error: error,
        ok: !error
    }
    return userInfor
}

//review
export const UserReviewInitial = async (userId:string)=> {
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", userId)
        .order('created_at', { ascending: false })

    const userReviews:DataState<Reviews[]> = {
        data: data,
        error: error,
        ok: !error
    }
    return userReviews
}

//memo
export const UserMemoInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("memo")
        .select("*")
        .eq("user_id", userId)
        .order('created_at', { ascending: false })

    const userMemo:DataState<Memo[]> = {
        data: data,
        error: error,
        ok: !error
    }
    return userMemo
}

//books
export const UserBooksInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", userId)
        .order('updated_at', { ascending: false })

    const userBooks:DataState<Books[]> = {
        data: data,
        error: error,
        ok: !error
    }
    return userBooks
}

//log
export const UserLogInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("reading_logs")
        .select("*")
        .eq("user_id", userId)
        .order('created_at', { ascending: false })

    const userLog:DataState<Log[]> = {
        data: data,
        error: error,
        ok: !error
    }
    return userLog
}

//wish
export const UserWishInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("wish")
        .select("*")
        .eq("user_id", userId)
        .order('created_at', { ascending: false })

    const userWish:DataState<Wish[]> = {
        data: data,
        error: error,
        ok: !error
    }
    return userWish
}

//setting
export const UserSetting = async(userId: string) => {
    const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .single()

    if(error) {
        return null
    }

    const UserSettings: SettingDefault | null = data
    return UserSettings
}