import { ErrorBoundary } from "react-error-boundary";
import { GlobalErrorFallback } from "../error/GlobalErrorFallBack";

export const metadata = {
    title: "wish"
}

export default function RootLayout({ children }){

    return(
        <>
            <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
            {children}
            </ErrorBoundary>
        </>
    )
}