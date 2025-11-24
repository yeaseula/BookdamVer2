import { create } from "zustand";

interface bookStore {
    title: string;
    type: string;
    setHeader: (title:string, type: string)=>void;
}

export const useHeaderStore = create<bookStore>((set)=>({
    title: "",
    type: "",
    setHeader: (title,type)=>set({title,type})
}))