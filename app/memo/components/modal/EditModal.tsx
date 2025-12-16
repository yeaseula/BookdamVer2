"use client"
import styled from "styled-components"
import { DataState, Memo } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction, useState } from "react"
import InputFields from "@/app/components/form/input"
import TextArea from "@/app/components/form/textarea"
import EditCloseButton from "./EditCloseButton"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { motion } from "framer-motion"
import ReactFocusLock from "react-focus-lock"
import { useForm, SubmitHandler } from "react-hook-form"
import { MeMoFormType } from "@/app/lib/dataTypes"
import SubmitButton from "@/app/components/common/SubmitButton"

const Modal = styled.section`
    max-width: 400px;
    max-height: 500px;
    overflow: auto;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    padding: 25px 15px;
    background: var(--board_background);
`

interface ModalProps {
    setModal: Dispatch<SetStateAction<boolean>>
    setEditPopup: Dispatch<SetStateAction<boolean>>
    editObj: Memo
    onClick: ()=>void
}

export default function EditModal({setModal,setEditPopup,editObj,onClick}:ModalProps) {
    const editingId = editObj.id
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)

    const {
        register,
        formState: { isValid, isSubmitting },
        handleSubmit
    } = useForm<MeMoFormType>({
        mode: "onChange",
        defaultValues: {
            booktitle: editObj.title,
            page: editObj.page,
            content: editObj.content
        }
    })

    const onSubmit: SubmitHandler<MeMoFormType> = (data) => handleModalEdit(data)


    const handleModalEdit = async (memodata:MeMoFormType)=>{
        try {
            if(!memodata.booktitle) throw new Error("제목을 입력해주세요.")
            else if(!memodata.page) throw new Error("페이지를 입력해주세요.")
            else if(!memodata.content) throw new Error("내용을 입력해주세요.")

            const { data, error } = await supabase
                .from("memo")
                .update({
                title: memodata.booktitle,
                page: memodata.page,
                content: memodata.content,
                updated_at: new Date().toISOString()
                })
                .eq("id", editingId)
                .select();

            const updatedMemo:DataState<Memo> = {
                data: data?.[0],
                error: error,
                ok: !error
            };
            if (!updatedMemo) return;

            if(!updatedMemo.data || !updatedMemo.ok) {
                throw new Error
            } else {
                useAuthStore.getState().updateData('memo',updatedMemo);
                setToast("수정이 완료됐습니다!", "success")
                setModal(false)
                setEditPopup(false)
            }
        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '메모 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        }
    }

    return(
        <>
        <motion.div
            initial={{ opacity:0 }}
            animate={{  opacity: 1 }}
            exit={{  opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                translateX: '-50%',
                maxWidth: '450px',
                width: '100%',
                zIndex: 100
            }}
        >
        <ReactFocusLock returnFocus={true}>
        <Modal>
            <div className="relative">
                <h2 className="mb-8 text-center font-bold text-3xl" style={{ color: 'var(--color_black)' }}>메모 수정하기</h2>
                <EditCloseButton onClick={onClick} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap gap-[7px]">
                        <InputFields
                            label="책제목"
                            name="booktitle"
                            required
                            width="calc((100% - 7px) / 2)"
                            rules={{
                                required: true,
                            }}
                            show={true}
                            placeholder="책 제목"
                            register={register}
                        />
                        <InputFields
                            type="number"
                            label="페이지"
                            name="page"
                            required
                            inputMode="numeric"
                            show={true}
                            width="calc((100% - 7px) / 2)"
                            register={register}
                            rules={{
                                required: true
                            }}
                            placeholder="페이지(숫자만 입력)"
                        />
                        <TextArea
                            label="내용"
                            name="memo-content"
                            placeholder="내용을 입력하세요."
                            height={90}
                            register={register}
                            show={true}
                            rules={{
                                required:true
                            }}
                        />
                    </div>
                    {!isValid && <p className="text-xl mt-3.5 text-cyan-600">모든 내용을 입력해주세요!</p>}
                    <div className="mt-8 h-[40px]">
                        <SubmitButton disabled={!isValid || isSubmitting} type="submit">수정하기</SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
        </ReactFocusLock>
        </motion.div>
        </>
    )
}