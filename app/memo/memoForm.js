"use client"
import styled from "styled-components"
import AddButton from "../components/form/add"
import InputFields from "../components/form/input"
import TextArea from "../components/form/textarea"
import { useRef } from "react"

const FormWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`
export default function MemoForm() {
    const arialabel = useRef('기억에 남는 구절 추가 버튼')
    const bookTitleRef = useRef(null)
    const bookPageRef = useRef(null)
    const bookMemoRef = useRef(null)

    return(
        <FormWrap>
            <InputFields
            type={'text'}
            placeholder={'책 제목'}
            name={'booktitle'}
            ref={bookTitleRef}
            $width={'calc((100% - 47px) / 2);'}
            />
            <InputFields
            type={'number'}
            placeholder={'페이지'}
            name={'bookpage'}
            ref={bookPageRef}
            $width={'calc((100% - 47px) / 2);'}
            />
            <AddButton arialabel={arialabel}></AddButton>
            <TextArea
            name={'bookcontents'}
            placeholder={'100자 이내로 입력하세요.'}
            ref={bookMemoRef}
            $height={'90px'}
            ></TextArea>
        </FormWrap>
    )
}