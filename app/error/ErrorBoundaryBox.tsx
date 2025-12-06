import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "./ErrorFallBack";

export default function ErrorBoundaryBox({children}:{children:React.ReactNode}) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
            {children}
        </ErrorBoundary>
    )
}