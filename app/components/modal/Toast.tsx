"use client"

import { useEffect, useRef } from "react";
import { useToastStore } from "@/app/lib/useToastStore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const { toasts, removeToast } = useToastStore();
    const prevToastsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if( !toasts.length ) return;
    toasts.forEach((tos)=>{

    if (prevToastsRef.current.has(tos.id)) {
        return;
    }

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
            onClose: () => {removeToast(tos.id)}
        })
    })}, [toasts, removeToast]);

    return null;
};

export default Toast;