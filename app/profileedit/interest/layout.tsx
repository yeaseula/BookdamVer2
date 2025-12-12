import Footer from "@/app/components/footer/Footer"
import { ErrorBoundary } from "react-error-boundary";
import { GlobalErrorFallback } from "@/app/error/GlobalErrorFallBack";

export const metadata = {
    title: "editinterest"
}

export default function RootLayout({children}){
    return(
        <>
        <main>
            <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
            {children}
            </ErrorBoundary>
            </main>
        <Footer />
        </>
    )
}