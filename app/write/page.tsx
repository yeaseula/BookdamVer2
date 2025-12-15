"use client"
import styled from "styled-components"
import InputFields from "../components/form/input"
import TextArea from "../components/form/textarea"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import createClient from "@/utils/supabase/client"
import { DataState, Reviews, useAuthStore } from "../lib/userfetch"
import { useSearchParams } from "next/navigation"
import { useToastStore } from "../lib/useToastStore"
import { useRouter } from "next/navigation"
import SelectField from "../components/form/select"
import SpinnerArea from "../components/spinner/SpinnerArea"
import { SubWrap } from "../components/common/container.styled"
import { throwSupabaseError } from "../error/errorLibrary"
import { useForm, SubmitHandler } from "react-hook-form"
import { WriteType } from "../lib/dataTypes"
import SubmitButton from "../components/common/SubmitButton"
import { DATE } from "../lib/Valid"

const FieldList = styled.div`
    margin-bottom: 20px;
`
const LastField = styled(FieldList)`
    margin-bottom: 0;
`
const FieldName = styled.label`
    display: inline-block;
    margin-bottom: 7px;
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--color_black);
`
export default function Write() {
    const {session} = useAuthStore();
    const [rating,setRating] = useState<number>(0)
    const [loading,setLoading] = useState<boolean>(false)
    const supabase = createClient()
    const searchParams = useSearchParams()
    const postId = searchParams.get('id')
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter();

    const {
        register,
        formState: {errors, isValid, isSubmitting },
        handleSubmit,reset,
        getValues
    } = useForm<WriteType>({
        mode: "onChange",
        defaultValues: {
            category: "",
            title: "",
            author: "",
            startDate: "",
            endDate: "",
            oneLine: "",
            review: "",
        }
    })

    useEffect(()=>{ //수정 시 기존 review를 불러옵니다
        if(!postId) return
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from("reviews")
                    .select("*")
                    .eq("id", postId)
                    .single();

                if(!error) {
                    reset({
                        category: data.category,
                        title: data.title,
                        author: data.author,
                        startDate: data.start_date,
                        endDate: data.end_date,
                        oneLine: data.memo,
                        review: data.content,
                    })
                    setRating(data.rating)
                }
            } catch(error) {
                setToast("리뷰 데이터를 불러오지 못했습니다","error")
                throwSupabaseError(error)
            }
        }
        fetchPost()
    },[postId])

    if(!session) return;
    const userId = session.user.id;

    const handlePoint = (e:React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.dataset.score;
        setRating(Number(target))
        if(rating === 2) {
            rating === Number(target) && setRating(0)
        }
    }
    const onSubmit: SubmitHandler<WriteType> = (data) => handleReviewSubmit(data)

    const handleReviewSubmit = async( reviewdata:WriteType ) => {

        if(loading) return
        setLoading(true)

        if(!reviewdata.category) throw new Error('카테고리를 설정해주세요.')
        else if(!reviewdata.title) throw new Error('제목을 입력해주세요.')
        else if(!reviewdata.author) throw new Error('작가명을 입력해주세요.')
        else if(!reviewdata.startDate) throw new Error('독서 시작일을 입력해주세요.')
        else if(!reviewdata.endDate) throw new Error('독서 종료일을 입력해주세요.')
        else if(!reviewdata.oneLine) throw new Error('한줄평을 입력해주세요.')
        else if(!reviewdata.review) throw new Error('독서 기록 내용을 입력해주세요.')

        try {
            if(postId) { //수정 시 update 함수
                const {data,error} = await supabase.from('reviews').update([
                    {
                        user_id: userId,
                        category: reviewdata.category,
                        title: reviewdata.title,
                        author: reviewdata.author,
                        start_date: reviewdata.startDate,
                        end_date: reviewdata.endDate,
                        memo: reviewdata.oneLine,
                        content: reviewdata.review,
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
                const {data,error} = await supabase.from('reviews').insert([
                    {
                        user_id: userId,
                        category: reviewdata.category,
                        title: reviewdata.title,
                        author: reviewdata.author,
                        start_date: reviewdata.startDate,
                        end_date: reviewdata.endDate,
                        memo: reviewdata.oneLine,
                        content: reviewdata.review,
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
        <SubWrap>
            {loading && <SpinnerArea text="글 등록중.."/>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldList>
                    <SelectField
                    label="카테고리"
                    name="category"
                    required
                    error={errors.category?.message}
                    register={register}
                    rules={{
                        required: true
                    }}
                    options={['국내소설','에세이','시','자연/과학','건강','인문','역사','만화/웹툰']}
                    />
                </FieldList>
                <FieldList>
                    <InputFields
                    label="제목"
                    name="title"
                    required
                    error={errors.title?.message}
                    placeholder="책 제목을 입력해 주세요."
                    register={register}
                    rules={{
                        required: true
                    }}
                    />
                </FieldList>
                <FieldList>
                    <InputFields
                    label="작가명"
                    name="author"
                    required
                    error={errors.author?.message}
                    placeholder="작가명을 입력해 주세요."
                    register={register}
                    rules={{
                        required: true
                    }}
                    />
                </FieldList>
                <FieldList>
                    <div style={{ display:'flex', gap: '1rem', alignItems:'center' }}>
                        <InputFields
                        type="date"
                        label="독서 시작일"
                        name="startDate"
                        required
                        error={errors.startDate?.message}
                        register={register}
                        max={DATE}
                        rules={{
                            required: true
                        }}/>
                        <InputFields
                        type="date"
                        label="독서 종료일"
                        name="endDate"
                        required
                        error={errors.endDate?.message}
                        register={register}
                        max={DATE}
                        rules={{
                            required: true,
                            validate: (value) => {
                                const startday = getValues("startDate")
                                if (!startday) return true
                                if (value < startday) return '종료 날짜는 시작 날짜보다 빠를 수 없습니다.'
                                return true
                            }
                        }}/>
                    </div>
                    {errors.endDate &&
                    <p className="text-red-600 mt-3 text-xl">{errors.endDate.message}</p>
                    }
                </FieldList>
                <FieldList>
                    <InputFields
                    label="한줄평"
                    name="oneLine"
                    required
                    error={errors.oneLine?.message}
                    placeholder="이 책을 한 줄로 평가해 주세요."
                    register={register}
                    rules={{
                        required: true
                    }} />
                </FieldList>
                <FieldList>
                    <TextArea
                        label="독서 기록 내용"
                        name="review"
                        required
                        error={errors.review?.message}
                        register={register}
                        height={168}
                        placeholder="독서 리뷰를 자유롭게 작성해 주세요."
                        rules={{
                            required: true
                        }}
                    />
                </FieldList>
                <LastField>
                    <FieldName>별점</FieldName>
                    <div>
                        {[2,4,6,8,10].map((score)=>(
                            <button
                            key={score}
                            type="button"
                            aria-label={`${score}점`}
                            data-score={`${score}`}
                            onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handlePoint(e)}>
                                <Image
                                src={`${rating >= score ? '/images/star-fill.svg' : 'images/star-gray.svg'}`}
                                alt=""
                                width={24}
                                height={24}
                                />
                            </button>
                        ))}
                    </div>
                </LastField>
                <div className="h-[40px] mt-[35px]">
                    <SubmitButton disabled={!isValid || isSubmitting} type="submit">등록</SubmitButton>
                </div>
            </form>
        </SubWrap>
    )
}