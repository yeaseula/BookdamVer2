"use client"
import styled from "styled-components"
import InputCheck from "../../components/form/inputCheck"
import { Wish } from "@/app/lib/userfetch"
import { throwSupabaseError } from "@/app/error/errorLibrary"

const List = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: start;
    padding: 10px 0 0 0;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
    color: var(--color_black);
`
const ListInfo = styled.div`
    width: 100%;
    padding-bottom: 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
`
const EmptyMessage = styled.p`
    text-align: center;
    padding-bottom: 10px;
    color: var(--color_black);
`
const CheckBox = styled.div`
    position: absolute;
    right: 5px;
    top: 10px;
    z-index: 10;
`
const formatMoney = (num:number) => num.toLocaleString();

export default function WishContent({wish,setCheckId,modal,setModal}) {

    if(!wish.ok || wish.error) {
        throwSupabaseError(wish.error)
    }

    if(wish.data?.length === 0) {
        return (
            <EmptyMessage>등록된 글이 없습니다</EmptyMessage>
        )
    }

    return (
        <>
            {wish.data?.map((w:Wish,idx:number)=>(
                <List key={w.id || `wish-${idx}`}>
                    <CheckBox>
                        <InputCheck
                        name={'list-check'}
                        index={w.id}
                        setCheckId={setCheckId}
                        />
                    </CheckBox>
                    <ListInfo>
                        <div className="w-[85%]">
                            <p className="font-medium">{w.title}</p>
                            <p className="text-xl">{w.author}</p>
                        </div>
                        <p className="text-xl">{formatMoney(Number(w.price))}원</p>
                    </ListInfo>
                </List>
            ))}
        </>
    )
}