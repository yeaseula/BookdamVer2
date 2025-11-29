import createClient from "@/utils/supabase/client";
import { Reviews, Memo, Books, Log, Wish } from "./userfetch";
const supabase = createClient()

//profile
export const UserInfoInitial = async (userId:string)=>{
    const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    const userInfor = data
    return userInfor
}

//review
export const UserReviewInitial = async (userId:string)=> {
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", userId)
        .order('created_at', { ascending: false })

    const userReviews:Reviews[] = data
    return userReviews
}

//memo
export const UserMemoInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("memo")
        .select("*")
        .eq("user_id", userId)
        .order('created_at', { ascending: false })

    const userMemo:Memo[] = data
    return userMemo
}

//books
export const UserBooksInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", userId)
        .order('updated_at', { ascending: false })

    const userBooks:Books[] = data
    return userBooks
}

//log
export const UserLogInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("log")
        .select("*")
        .eq("user_id", userId)
        .order('created_at', { ascending: false })

    const userLog:Log[] = data
    return userLog
}

//wish
export const UserWishInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("wish")
        .select("*")
        .eq("user_id", userId)
        .order('created_at', { ascending: false })

    const userWish:Wish[] = data
    return userWish
}
