"use client"

export default function Error({
        error,
        reset,
    }: {
        error: Error & { digest?: string }
        reset: () => void
    }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">문제가 발생했습니다</h2>
            <p className="text-gray-600 mb-6">
                { '페이지를 불러올 수 없습니다'}
            </p>
            <div className="space-x-4">
                <button
                onClick={reset}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                다시 시도
                </button>
                <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                홈으로
                </button>
            </div>
            </div>
        </div>
    )
}