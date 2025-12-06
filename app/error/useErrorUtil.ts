import { useErrorBoundary } from "react-error-boundary";

export function useErrorUtil() {
    const { showBoundary } = useErrorBoundary()

    return (type: 'banner' | 'api', err:unknown) => {
        const e = new Error(
            err instanceof Error ? err.message : String(err)
        )
        ;(e as any).type = type
        showBoundary(e)
    }
}