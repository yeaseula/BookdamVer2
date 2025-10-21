"use client"
import styled from "styled-components"
import MemoForm from "./memoForm"
import MemoContent from "./memoContent"

const MemoWrap = styled.section`
    padding: 30px 15px 65px;
`

export default function MemoPage() {
    return(
        <MemoWrap>
            <h2 className="sr-only">기억에 남는 구절</h2>
            <MemoForm />
            <div className="mt-[35px]">
                <MemoContent />
            </div>
            <section>
                <button type="button" id="delete_btn" className="dark-style-btn">삭제</button>
            </section>
        </MemoWrap>
    )
}