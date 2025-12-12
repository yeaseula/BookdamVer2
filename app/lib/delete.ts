import createClient from "@/utils/supabase/client";
import { ParamValue } from "next/dist/server/request/params";

export async function deleteReview(id: ParamValue, userId: string) {
    const supabase = createClient();

    const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

    return { error };
}


export const handleDeletUtil = async(
    checkedId:string,
    userId: string,
    table: string
) =>{

    const supabase = createClient();

    const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", checkedId)
        .eq("user_id", userId);

        return { error }
}