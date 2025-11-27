import styled from "styled-components"
import { useAuthStore } from "@/app/lib/userfetch"

const HashTag = styled.span`
    border: 1px solid #bdbdbd;
    border-radius: 50px;
`

export default function Profile({username,interests}) {

    return(
        <>
            <div></div>
            <div>
                <p className="text-4xl font-bold">{username}</p>
                <p className="mt-3">
                    {interests.map((ele:string,index:number)=>(
                        <span key={`${index}-${ele}`}
                        className="mr-1.5 border border-gray-400
                        pt-1 pb-1 pr-4 pl-4 rounded-4xl text-lg
                        ">#{ele}</span>
                    ))}
                </p>
            </div>
        </>
    )
}