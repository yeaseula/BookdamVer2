import { toast } from "react-toastify";
import { create } from "zustand";

interface ToastItem {
    message: string;
    type: "success" | "error" | "info" | "warning";
}

interface ToastState {
    isWorking: boolean;
    toasts: ToastItem; //msg,type
    setWorking: (value: boolean) => void;
    setToast: (msg:string, type:ToastItem["type"])=>void;
}

export const useToastStore = create<ToastState>((set)=>({
    isWorking: false,
    toasts: {
        message: '',
        type: 'success',
        isOneTime: false,
    },
    setWorking : (value) => set({ isWorking: value }),
    setToast: (msg,type) => set({ toasts: {
        message: msg,
        type: type,
    } }),
}))