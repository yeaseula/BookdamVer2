import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalErrorFallback } from "../error/GlobalErrorFallBack";
export const metadata = {
    title: "write"
}

export default function RootLayout({children}){
    return(
        <div className="sub-wrap">
            <Header />
            <main>
                <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
                {children}
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    )
}