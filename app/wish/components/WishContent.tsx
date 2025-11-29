"use client"
import styled from "styled-components"
import InputCheck from "../../components/form/inputCheck"
import { Wish } from "@/app/lib/userfetch"

const List = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    padding-top: 10px;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
`
const ListInfo = styled.div`
    width: 90%;
    padding-bottom: 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
`

const EmptyMessage = styled.p`
    padding-bottom: 10px;
`

export default function WishContent({wish,checkId,setCheckId}) {
    const formatMoney = (num:number) => num.toLocaleString();

    return (
        <>
            {!wish && <EmptyMessage>등록된 글이 없습니다</EmptyMessage>}
            {wish && (
                wish.map((w:Wish,idx:number)=>(
                <List key={`${w.title}-${idx}`}>
                    <div>
                        <InputCheck type={'checkbox'} name={'list-check'} index={w.id} checkId={checkId} setCheckId={setCheckId} />
                    </div>
                    <ListInfo>
                        <div>
                            <p className="font-medium">{w.title}</p>
                            <p className="text-xl">{w.author}</p>
                        </div>
                        <p className="text-xl">{formatMoney(w.price)}원</p>
                    </ListInfo>
                </List>
                ))
            )}
        </>
    )
}