import styled from "styled-components"
import Toggle from "./Toggle"
import categories from './category.json'


interface Category {
    label: string;
    value: string;
    sub: string[];
}

export default function InterestList() {

    const cats:Category[] = categories

    return (
        <div className="mt-3">
            {cats.map((inter)=>(
                <Toggle key={inter.label} label={inter.label} value={inter.value} sub={inter.sub}  />
            ))}
        </div>

    )
}