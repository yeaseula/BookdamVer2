import styled, {keyframes} from "styled-components";
import Checkbox from "./CheckBox"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";

const ToggleHead = styled.div`
    display: flex;
    width:100%;
    justify-content: space-between;
    align-items:center;
    cursor: pointer;
    padding: 5px 10px;
    background: #eee;
    border-radius: 5px;
`
const Button = styled.button`
    font-size: 1.4rem;
`;
const slideDown = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;
const SubList = styled.div`
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    list-style: none;
    animation: ${slideDown} 0.2s ease-out;
`;
const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`

interface ToggleProps {
    label: string;
    value: string;
    sub: string[];
    interest: string[];
    setInterest: Dispatch<SetStateAction<string[]>>;
    originList?: React.RefObject<string[]>;
    originFetch?:boolean;
    setIsOriginFecth: Dispatch<SetStateAction<boolean>>
}

export default function Toggle({label,value,sub,interest,setInterest,originList,originFetch,setIsOriginFecth}:ToggleProps) {
    const [openCategory,setOpenCategory] = useState(false)

    useEffect(()=>{
        if(!originList) return //sign up페이지에서 return

        const hasSub = sub.some(item => interest.includes(item))
        if(hasSub) {
            setOpenCategory(true)
        } else {
            setOpenCategory(false)
        }
    },[originFetch,interest,sub])

    const ArrayMatch = (value:string):boolean => {
        if(!originList) return false
        if(originList) {
            return originList.current.some(item => item.includes(value))
        }
    }

    return (
    <div className="mb-6">
        <ToggleHead onClick={()=>setOpenCategory(!openCategory)}>
            <Button type="button"
            data-number={value}
            >{label}</Button>
            <RiArrowDownSLine size={18} />
        </ToggleHead>
        <SubList className={`${value}-toggle mt-4`}
        style={{ display: `${openCategory ? 'block' : 'none'}` }}
        >
            <Ul>
                {sub.map((subcont)=>(
                    <Checkbox
                    key={`${subcont}-${value}`}
                    id={`${subcont}-check`}
                    name={`${subcont}-check`}
                    value={subcont}
                    checked={ArrayMatch(subcont)}
                    interest={interest}
                    setInterest={setInterest}
                    originList={originList}
                    setIsOriginFecth={setIsOriginFecth}
                    />
                ))}
            </Ul>
        </SubList>
    </div>
    )
}