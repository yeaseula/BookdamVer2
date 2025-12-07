import { create } from "zustand";

interface bookStore {
    title: string;
    type: string;
    setNav: (title:string, type: string)=>void;
}

export const useNavStore = create<bookStore>((set)=>({
    title: "",
    type: "",
    setNav: (title,type)=>set({title,type})
}))