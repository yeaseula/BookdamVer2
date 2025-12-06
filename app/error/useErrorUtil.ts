import { useErrorBoundary } from "react-error-boundary";

//일부 컴포넌트의 에러만 다룸
export function useErrorUtil() {
    const { showBoundary } = useErrorBoundary()

    return (err:unknown) => {
        const e = new Error(
            err instanceof Error ? err.message : String(err)
        )
        showBoundary(e)
    }
}