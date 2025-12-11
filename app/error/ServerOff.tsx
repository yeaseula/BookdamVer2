"use client"

export default function ServerOff() {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh] text-center">
        <svg
            width="90"
            height="90"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
            d="M1 9l2-2c5.523-5.523 14.477-5.523 20 0l2 2M5 13l2-2c3.314-3.314 8.686-3.314 12 0l2 2M12 18h.01"
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeLinecap="round"
            />
            <line
            x1="2"
            y1="2"
            x2="22"
            y2="22"
            stroke="#ff6b6b"
            strokeWidth="2.5"
            strokeLinecap="round"
            />
        </svg>
            <p className="mt-5 text-4xl font-bold">
                인터넷 연결이 끊겼습니다!
            </p>
            <p className="mt-2 text-3xl">연결 상태를 확인해주세요.</p>
        </div>
    )
}