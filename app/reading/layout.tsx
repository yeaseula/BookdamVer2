import Footer from "../components/footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalErrorFallback } from "../error/GlobalErrorFallBack";

export const metadata = {
    title: "reading"
}

export default function RootLayout({ children }){

    return(
        <div className="sub-wrap">
            <main>
                <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
                {children}
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    )
}