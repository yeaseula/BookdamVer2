"use client"
import styled from "styled-components"
import InputCheck from "../../components/form/inputCheck"
import { Wish } from "@/app/lib/userfetch"

const List = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: start;
    padding: 10px 0 0 0;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
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
`
const CheckBox = styled.div`
    position: absolute;
    right: 5px;
    top: 10px;
    z-index: 10;
`

export default function WishContent({wish,checkId,modal,setModal}) {
    const formatMoney = (num:number) => num.toLocaleString();

    return (
        <>
            {wish.length === 0 && <EmptyMessage>등록된 글이 없습니다</EmptyMessage>}
            {wish.length !== 0 && (
                wish.map((w:Wish,idx:number)=>(
                <List key={`${w.title}-${idx}`}>
                    <CheckBox>
                        <InputCheck
                        type={'checkbox'}
                        name={'list-check'}
                        index={w.id}
                        checkId={checkId}
                        modal={modal}
                        setModal={setModal}
                        />
                    </CheckBox>
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