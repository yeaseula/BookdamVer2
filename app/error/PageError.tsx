import { RiErrorWarningFill } from "@remixicon/react"

export default function PageError() {
    return (
        <div className="text-center">
            <RiErrorWarningFill size={40} style={{ margin: '0 auto', color: '#ef4444' }} />
            <p className="mt-5 text-2xl font-bold">데이터를 불러올 수 없습니다</p>
            <p className="mt-2 text-gray-500 text-sm">
                {/* {reviews.error?.message || '잠시 후 다시 시도해주세요'} */}
            </p>
        </div>
    )
}