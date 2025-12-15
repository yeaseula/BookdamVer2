import { useState } from "react"
import styled, {keyframes} from "styled-components"
import { MemoInterestsCheckbox } from "./InterestCheckbox"
import { RiArrowDownSLine } from "@remixicon/react"

const ToggleHead = styled.button`
    display: flex;
    width:100%;
    justify-content: space-between;
    align-items:center;
    cursor: pointer;
    padding: 5px 10px;
    background: var(--background-color-light);
`
const Legend = styled.span`
    font-size: 1.4rem;
`
const slideDown = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;
const SubList = styled.div`
    padding: 10px;
    border-radius: 5px;
    list-style: none;
    animation: ${slideDown} 0.2s ease-out;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;

export default function InterestGroup ({topic}) {

    const [open,setOpen] = useState(false)

    return (
        <div className="mt-6 mb-6 rounded-xl overflow-hidden border border-gray-200">
        <ToggleHead type="button" onClick={()=>setOpen(!open)}>
            <Legend>{topic.label}</Legend>
            <RiArrowDownSLine size={18} />
        </ToggleHead>
        <SubList hidden={!open}>
            {topic.sub.map((t,i)=>(
                <MemoInterestsCheckbox
                key={t}
                id={`${t}-${i}`}
                value={`${t}`}
                />
            ))}
        </SubList>
        </div>
    )
}