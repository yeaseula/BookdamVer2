import { create } from "zustand";

interface ToastState {
    message: string;
    show: boolean;
    type: "success" | "error" | "info";
    callback?: () => void;
    setToast: (msg:string,type: "success" | "error" | "info", cb?:()=>void) => void;
    hideToast: () => void;
}

export const useToastStore = create<ToastState>((set)=>({
    message: '',
    show: false,
    type: "success",
    callback: undefined,
    setToast: (msg,type,cb) => set({ message:msg, type:type, show:true, callback:cb }),
    hideToast: () => set({ show: false, callback:undefined }),
}))