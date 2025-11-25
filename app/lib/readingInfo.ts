import createClient from "@/utils/supabase/client";
import { Reviews, Memo } from "./userfetch";
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
        .eq("id", userId)

    const userReviews:Reviews[] = data
    return userReviews
}

//memo
export const UserMemoInitial = async (userId:string) => {
    const { data, error } = await supabase
        .from("memo")
        .select("*")
        .eq("id", userId)

    const userMemo:Memo[] = data
    return userMemo
}