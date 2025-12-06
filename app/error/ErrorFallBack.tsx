export function ErrorFallBack({ error, resetErrorBoundary }: any) {
    return (
        <div className={`${error.type === 'banner' && 'mr-8 w-[125px]'} h-[100%] p-5 bg-amber-50 text-center`}>
            <div>🚫</div>
            <p className="text-xl">데이터 로드 실패</p>
            <p className="text-xl">error : {error.message}</p>
            <button className="text-xl px-6 pt-2 pb-1 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={resetErrorBoundary}>다시 시도</button>
        </div>
    )
}