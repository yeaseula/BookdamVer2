"use client"
import styled from "styled-components"
import InputFields from "../components/form/input"
import TextArea from "../components/form/textarea"
import Image from "next/image"
import SelectField from "../components/form/select"
import React, { useEffect, useRef, useState } from "react"
import WriteButton from "./components/WriteButton"
import createClient from "@/utils/supabase/client"
import { DataState, Reviews, useAuthStore } from "../lib/userfetch"
import { useSearchParams } from "next/navigation"
import { useToastStore } from "../lib/useToastStore"
import { useRouter } from "next/navigation"
import Picker from "react-mobile-picker"
import SpinnerArea from "../components/spinner/SpinnerArea"

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
    const {session} = useAuthStore();
    const [category,setCategory] = useState<string>('')
    const [title,setTitle] = useState<string>('')
    const [author,setAuthor] = useState<string>('')
    const [startDate,setStartDate] = useState<string>('')
    const [endDate,setEndDate] = useState<string>('')
    const [oneLine,setOneLine] = useState<string>('')
    const [review,setReview] = useState<string>('')
    const [rating,setRating] = useState<number>(0)
    const [loading,setLoading] = useState<boolean>(false)
    const supabase = createClient()
    const searchParams = useSearchParams()
    const postId = searchParams.get('id')
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter();

    const handlePoint = (e:React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.dataset.score;
        setRating(Number(target))
        if(rating === 2) {
            rating === Number(target) && setRating(0)
        }
    }

    useEffect(()=>{ //수정 시 기존 review를 불러옵니다
        if(!postId) return
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("reviews")
                .select("*")
                .eq("id", postId)
                .single();

            if (!error && data) {
                setCategory(data.category);
                setTitle(data.title);
                setAuthor(data.author);
                setReview(data.content);
                setStartDate(data.start_date)
                setEndDate(data.end_date);
                setOneLine(data.memo)
                setRating(data.rating)
            }
        }

        fetchPost()
    },[postId])

    if(!session) return;
    const userId = session.user.id;

    const handleSubmit = async(
        userId: string,
        category: string,
        title: string,
        author: string,
        startDate: string,
        endDate: string,
        memo: string,
        content: string,
        rating: number
    ) => {
        if(loading) return //업로드 중일 때 중복 실행 금지
        setLoading(true) //로딩중 상태 진입
        try {
            if(postId) { //수정 시 update 함수

                if(!category) throw new Error('카테고리를 설정해주세요.')
                else if(!title) throw new Error('제목을 입력해주세요.')
                else if(!author) throw new Error('작가명을 입력해주세요.')
                else if(!startDate) throw new Error('독서 시작일을 입력해주세요.')
                else if(!endDate) throw new Error('독서 종료일을 입력해주세요.')
                else if(!memo) throw new Error('한줄평을 입력해주세요.')
                else if(!content) throw new Error('독서 기록 내용을 입력해주세요.')

                const {data,error} = await supabase.from('reviews').update([
                    {
                        user_id: userId,
                        category: category,
                        title: title,
                        author: author,
                        start_date: startDate,
                        end_date: endDate,
                        memo: memo,
                        content: content,
                        rating: rating
                    }
                ])
                .eq("id", postId).select()

                const newReview:DataState<Reviews> = {
                    data: data?.[0],
                    error: error,
                    ok: !error
                }
                if(!newReview.ok) {
                    throw new Error
                } else {
                    useAuthStore.getState().updateData("reviews",newReview)
                    router.push('/review')
                    setToast("리뷰 수정이 완료됐어요!", "success")
                }

            } else {

                if(!category) throw new Error('카테고리를 설정해주세요.')
                else if(!title) throw new Error('제목을 입력해주세요.')
                else if(!author) throw new Error('작가명을 입력해주세요.')
                else if(!startDate) throw new Error('독서 시작일을 입력해주세요.')
                else if(!endDate) throw new Error('독서 종료일을 입력해주세요.')
                else if(!memo) throw new Error('한줄평을 입력해주세요.')
                else if(!content) throw new Error('독서 기록 내용을 입력해주세요.')

                const {data,error} = await supabase.from('reviews').insert([
                    {
                        user_id: userId,
                        category: category,
                        title: title,
                        author: author,
                        start_date: startDate,
                        end_date: endDate,
                        memo: memo,
                        content: content,
                        rating: rating
                    }
                ]).select()

                const newReviewPost:DataState<Reviews> = {
                    data: data?.[0],
                    error: error,
                    ok: !error
                }

                if(!newReviewPost.ok) {
                    throw new Error
                } else {
                    useAuthStore.getState().addData("reviews",newReviewPost)
                    router.push('/review')
                    setToast("리뷰 등록이 완료됐어요!", "success")
                }
            }

        } catch(err) {
            console.error('등록 실패 :' + err)
            const errorMessage = err instanceof Error
                ? err.message
                : '리뷰 등록이 실패했습니다'
            setToast(errorMessage, "error")
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: '80px 15px 65px' }}>
            {loading && <SpinnerArea text="글 등록중.."/>}

            <form>
                <FieldList>
                    <FieldName>카테고리 <b className="font-bold text-red-700"> *</b></FieldName>
                    <SelectField name="category"

                    value={category}
                    options={['국내소설','에세이','시','자연/과학','건강','인문','역사','만화/웹툰']}
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setCategory(e.target.value)}}
                    />
                </FieldList>
                <FieldList>
                    <FieldName>제목 <b className="font-bold text-red-700"> *</b></FieldName>
                    <InputFields
                    type="text"
                    placeholder="책 제목을 입력해 주세요."
                    name="book_name"
                    value={title}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setTitle(e.target.value)}}
                    />
                </FieldList>
                <FieldList>
                    <FieldName>작가명 <b className="font-bold text-red-700"> *</b></FieldName>
                    <InputFields
                    type="text"
                    placeholder="작가명을 입력해 주세요."
                    name="author_name"
                    value={author}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setAuthor(e.target.value)}}
                    />
                </FieldList>
                <FieldList>
                    <FieldName>독서 기간 <b className="font-bold text-red-700"> *</b></FieldName>
                    <div style={{ display:'flex', gap: '1rem', alignItems:'center' }}>
                        <InputFields
                        type="date"
                        name="start_date"
                        value={startDate}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setStartDate(e.target.value)}
                        />
                        <InputFields
                        type="date"
                        name="end_date"
                        value={endDate}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEndDate(e.target.value)}
                        />
                    </div>
                </FieldList>
                <FieldList>
                    <FieldName>한줄평 <b className="font-bold text-red-700"> *</b></FieldName>
                    <InputFields
                    type="text"
                    placeholder="이 책을 한 줄로 평가해 주세요."
                    name="oneline"
                    value={oneLine}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setOneLine(e.target.value)}
                    />
                </FieldList>
                <FieldList>
                    <FieldName>독서 기록 내용 <b className="font-bold text-red-700"> *</b></FieldName>
                    <TextArea
                        name="review_content"
                        height={168}
                        value={review}
                        placeholder="독서 리뷰를 자유롭게 작성해 주세요."
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setReview(e.target.value)}}
                    />
                </FieldList>
                <LastField>
                    <FieldName>별점</FieldName>
                    <div>
                        <button type="button" aria-label="2점" data-score="2" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${rating >= 2 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                        <button type="button" aria-label="4점" data-score="4" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${rating >= 4 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                        <button type="button" aria-label="6점" data-score="6" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${rating >= 6 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                        <button type="button" aria-label="8점" data-score="8" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${rating >= 8 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                        <button type="button" aria-label="10점" data-score="10" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                            <Image
                            src={`${rating === 10 ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                            alt=""
                            width={24}
                            height={24}
                            />
                        </button>
                    </div>
                </LastField>
            </form>
            <div className="mt-[35px]">
                <WriteButton
                type="button"
                category={category}
                title={title}
                author={author}
                startDate={startDate}
                endDate={endDate}
                oneLine={oneLine}
                review={review}
                point={rating}
                loading={loading}
                onClick={()=>{handleSubmit(userId,category,title,author,startDate,endDate,oneLine,review,rating)}}
                />
            </div>
        </div>
    )
}