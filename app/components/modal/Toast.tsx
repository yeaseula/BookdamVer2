"use client"

import { useEffect, useRef } from "react";
import { useToastStore } from "@/app/lib/useToastStore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const { toasts } = useToastStore();

    useEffect(() => {
        if(!toasts.message) return

        toast(toasts.message,{
            type: toasts.type,
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            ariaLabel: toasts.message,
        })
    }, [toasts]);

    return null;
};

export default Toast;