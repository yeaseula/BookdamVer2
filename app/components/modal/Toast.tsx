"use client"

import { useEffect, useRef } from "react";
import { useToastStore } from "@/app/lib/useToastStore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const { toasts, removeToast } = useToastStore();
    const prevToastsRef = useRef<Set<string>>(new Set())

    if (toasts.length > 3) {
        toast.clearWaitingQueue(); // 아직 화면에 안 뜬 토스트 제거
        console.warn("대기 큐 초기화됨: 토스트 폭주 방지");
    }

    useEffect(() => {
        toasts.forEach((tos)=>{
            if (prevToastsRef.current.has(tos.id)) return
            prevToastsRef.current.add(tos.id)

            toast(tos.message,{
                type: tos.type,
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                ariaLabel: tos.message,
                onClose: () => {
                    removeToast(tos.id)
                    prevToastsRef.current.delete(tos.id)
                }
            })
        })}, [toasts, removeToast]);

    return null;
};

export default Toast;