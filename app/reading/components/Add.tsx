"use client"
import { AddButtonstyle } from "@/app/components/form/Add.styled";
import Image from "next/image"


interface ButtonProps {
    arialabel: string;
    type: "button" | "submit" | "reset";
    title: string;
    page: number;
    readPage: number;
    onClick:()=>Promise<void>;
}

export default function AddButton({...props}:ButtonProps) {

    const isValid = props.title && props.page && props.readPage

    return(
        <AddButtonstyle aria-label={props.arialabel} disabled={!isValid} onClick={props.onClick}>
            <Image src={'/images/add-line.svg'}
            width={24} height={24} alt=""></Image>
        </AddButtonstyle>
    )
}