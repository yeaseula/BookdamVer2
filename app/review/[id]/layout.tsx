
import { ErrorBoundary } from "react-error-boundary";
import { GlobalErrorFallback } from "@/app/error/GlobalErrorFallBack";
import createClient from "@/utils/supabase/server";
import NotFound from "@/app/not-found";

export const metadata = {
    title: "review"
}

interface LayoutProps {
    params: { id:string };
    children: React.ReactNode;
}

export default async function RootLayout({ params, children }){

    const {id} = await params;

    const { supabase } = await createClient()
    const { data: review, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !review) {
        // 리뷰가 없음 (삭제 혹은 타인의 리뷰에 접근시)
        return <NotFound />
    }

    return(
        <>
            <main>
                <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
                    {children}
                </ErrorBoundary>
            </main>
        </>
    )
}