import createClient from "@/utils/supabase/client";

export async function deleteReview(id: string, userId: string) {
    const supabase = createClient();

    const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

    return { error };
}
