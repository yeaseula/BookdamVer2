import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalErrorFallback } from "../error/GlobalErrorFallBack";

export const metadata = {
    title: "mypage"
}

export default function RootLayout({children}){
    return(
        <>
        <div className="sub-wrap">
            <main>
                <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
                {children}
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
        </>
    )
}