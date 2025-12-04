import styled from "styled-components"
import Toggle from "./Toggle"
import categories from './category.json'
import { Dispatch, SetStateAction } from "react";


interface Category {
    label: string
    value: string
    sub: string[]
}
interface ListProps {
    interest: string[]
    originList?: React.RefObject<string[]> //수정 페이지에서만 사용
    originFetch?: boolean;
    setIsOriginFecth?: Dispatch<SetStateAction<boolean>>
    setInterest: Dispatch<SetStateAction<string[]>>
}

export default function InterestList({interest,originList,originFetch,setIsOriginFecth,setInterest}:ListProps) {

    const cats:Category[] = categories

    return (
        <div className="mt-3">
            {cats.map((inter)=>(
                <Toggle
                key={inter.label}
                label={inter.label}
                value={inter.value}
                sub={inter.sub}
                interest={interest}
                setInterest={setInterest}
                setIsOriginFecth={setIsOriginFecth}
                originFetch={originFetch}
                originList={originList}
                />
            ))}
        </div>

    )
}