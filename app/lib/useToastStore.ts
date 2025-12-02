import { create } from "zustand";

interface ToastItem {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}

interface ToastState {
    isWorking: boolean;
    toasts: ToastItem[]; //id,msg,type
    maxToast: 3;

    setWorking: (value: boolean) => void;
    setToast: (msg:string, type:ToastItem["type"])=>void;
    removeToast: (id:string) => void;
}

export const useToastStore = create<ToastState>((set)=>({
    isWorking: false,
    toasts: [],
    maxToast: 3,
    setWorking : (value) => set({ isWorking: value }),
    setToast: (msg,type) => {
        set((state)=>{
            const newToasts = [...state.toasts, { id:crypto.randomUUID(), message:msg, type }]
            return { toasts: newToasts, isWorking: true}
        })
    },
    removeToast: (id:string)=>set((state)=>({
        toasts: state.toasts.filter((toast)=>toast.id !== id)
    })),
}))