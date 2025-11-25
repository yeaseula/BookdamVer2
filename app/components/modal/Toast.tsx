"use client"

import { useEffect } from "react";
import { useToastStore } from "@/app/lib/useToastStore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const { message, type, show, hideToast, callback } = useToastStore();

  useEffect(() => {
    if(!show || message == null) return;
    if (message && show) {
        toast(message, {
        type: type,
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ariaLabel: message,
        onClose:()=>{
            callback?.();
            hideToast();
        }});
    }
    }, [show]);

    return null;
};

export default Toast;