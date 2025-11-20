"use client"
import styled from "styled-components"
import InputFields from "../components/form/input"
import TextArea from "../components/form/textarea"
import Image from "next/image"
import SelectField from "../components/form/select"
import React, { useEffect, useState } from "react"
import WriteButton from "./components/WriteButton"

const FieldList = styled.div`
    margin-bottom: 20px;
`
const LastField = styled(FieldList)`
    margin-bottom: 0;
`
const FieldName = styled.span`
    display: inline-block;
    margin-bottom: 7px;
    font-size: 1.6rem;
    font-weight: bold;
`

export default function Write() {

    const [category,setCategory] = useState<string>('')
    const [title,setTitle] = useState<string>('')
    const [author,setAuthor] = useState<string>('')
    const [startDate,setStartDate] = useState<string>('')
    const [endDate,setEndDate] = useState<string>('')
    const [oneLine,setOneLine] = useState<string>('')
    const [review,setReview] = useState<string>('')
    const [point,setPoint] = useState<number>(0)

    const handlePoint = (e:React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.dataset.score;
        setPoint(Number(target))
    }

    const handleSubmit = () => {

    }

    return (
        <div style={{ padding: '30px 15px 65px' }}>
            <form>
                <FieldList>
                    <FieldName>카테고리</FieldName>
                    <SelectField name="category"
                    options={['국내소설','에세이','시','자연/과학','건강','인문','역사','만화/웹툰']}
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setCategory(e.target.value)}}
                    />
                </FieldList>
                <FieldList>
                    <FieldName>제목</FieldName>
                    <InputFields
                    type="text"
                    placeholder="책 제목을 입력해 주세요."
                    name="book_name"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setTitle(e.target.value)}}
                    />
                </FieldList>
                <FieldList>
                    <FieldName>작가명</FieldName>
                    <InputFields
                    type="text"
                    placeholder="작가명을 입력해 주세요."
                    name="author_name"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setAuthor(e.target.value)}}
                    />
                </FieldList>
                <FieldList>
                    <FieldName>독서 기간</FieldName>
                    <div style={{ display:'flex', gap: '1rem', alignItems:'center' }}>
                        <InputFields
                        type="date"
                        name="start_date"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setStartDate(e.target.value)}
                        />
                        <InputFields
                        type="date"
                        name="end_date"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEndDate(e.target.value)}
                        />
                    </div>
                </FieldList>
                <FieldList>
                    <FieldName>한줄평</FieldName>
                    <InputFields
                    type="text"
                    placeholder="이 책을 한 줄로 평가해 주세요."
                    name="oneline"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setOneLine(e.target.value)}
                    />
                </FieldList>
                <FieldList>
                    <FieldName>독서 기록 내용</FieldName>
                    <TextArea
                        name="review_content"
                        height={168}
                        placeholder="독서 리뷰를 자유롭게 작성해 주세요."
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setReview(e.target.value)}}
                    />
                </FieldList>
                <LastField>
                    <FieldName>별점</FieldName>
                    <div>
                        <button type="button" aria-label="2점" data-score="2" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${point >= 2 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                        <button type="button" aria-label="4점" data-score="4" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${point >= 4 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                        <button type="button" aria-label="6점" data-score="6" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${point >= 6 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                        <button type="button" aria-label="8점" data-score="8" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${point >= 8 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                        <button type="button" aria-label="10점" data-score="10" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${point === 10 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                    </div>
                </LastField>
            </form>
            <WriteButton
            category={category}
            title={title}
            author={author}
            startDate={startDate}
            endDate={endDate}
            oneLine={oneLine}
            review={review}
            point={point}
            onClick={handleSubmit}
            />
        </div>
    )
}