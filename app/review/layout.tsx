import Footer from "../components/footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalErrorFallback } from "../error/GlobalErrorFallBack";

export const metadata = {
    title: "review"
}

interface LayoutProps {
    children: React.ReactNode;
    headertitle?: string;
    headerRightSide?: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps){

    return(
        <>
            <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
                {children}
            </ErrorBoundary>
            <Footer />
        </>
    )
}